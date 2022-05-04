import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { LoadDoc, LoadSchemaName } from '~modules/loads/schemas/load.schema';
import { UserDoc } from '~modules/users/schemas/user.schema';
import { AddLoadBodyDto } from '~modules/loads/dtos/add-load.body.dto';
import { LoadStatusEnum } from '~modules/loads/enums/load-status.enum';
import { TrucksService } from '~modules/trucks/services/trucks.service';
import { UsersService } from '~modules/users/services/users.service';
import { TruckStatusEnum } from '~modules/trucks/enums/truck-status.enum';
import { LoadStateEnum } from '~modules/loads/enums/load-state.enum';
import { TruckDoc } from '~modules/trucks/schemas/truck.schema';
import { GetManyQueryDto } from '~modules/loads/dtos/get-many.query.dto';
import { UpdateLoadBodyDto } from '~modules/loads/dtos/update-load.body.dto';

@Injectable()
export class LoadsService {
  constructor(
    @InjectModel(LoadSchemaName)
    private readonly _loadModel: Model<LoadDoc>,
    private readonly _trucksService: TrucksService,
    private readonly _usersService: UsersService
  ) {}

  async findManyLoads(user: UserDoc, query: GetManyQueryDto) {
    const loads = await this._loadModel.find()
      .or([{ created_by: user._id }, { assigned_to: user._id }])
      .skip(query.offset)
      .limit(query.limit);
    if (query.status) {
      loads.filter(load => load.status === query.status);
    }
    return loads;
  }

  async addLoad(user: UserDoc, addLoadBodyDto: AddLoadBodyDto) {
    const load = await this._loadModel.create({ created_by: user._id, ...addLoadBodyDto });
    load.logs.push({ message: 'Load created' });
    await load.save();
  }

  async getDriverActiveLoad(user: UserDoc) {
    const load = await this._loadModel.findOne({
      assigned_to: user._id,
      status: LoadStatusEnum.ASSIGNED
    });
    if (!load) {
      throw new BadRequestException('No active loads');
    }
    return load;
  }

  async iterateLoadState(load: LoadDoc, truck: TruckDoc) {
    let message: string;
    switch (load.state) {
      case LoadStateEnum.EN_ROUTE_TO_PICK_UP:
        load.state = LoadStateEnum.ARRIVED_TO_PICK_UP;
        message = `Load state changed to '${LoadStateEnum.ARRIVED_TO_PICK_UP}'`;
        break;
      case LoadStateEnum.ARRIVED_TO_PICK_UP:
        load.state = LoadStateEnum.EN_ROUTE_TO_DELIVERY;
        message = `Load state changed to '${LoadStateEnum.EN_ROUTE_TO_DELIVERY}'`;
        break;
      case LoadStateEnum.EN_ROUTE_TO_DELIVERY:
        load.state = LoadStateEnum.ARRIVED_TO_DELIVERY;
        message = `Load state changed to '${LoadStateEnum.ARRIVED_TO_DELIVERY}'`;
        load.status = LoadStatusEnum.SHIPPED;
        truck.status = TruckStatusEnum.IS;
        await truck.save();
        break;
    }
    load.logs.push({ message });
    await load.save();
    return { message };
  }

  async findLoadById(user: UserDoc, loadId: string) {
    const isTruckIdValid = isValidObjectId(loadId);
    if (!isTruckIdValid) {
      throw new BadRequestException('Nothing found');
    }
    const load = await this._loadModel.findOne({ _id: loadId })
      .or([{ created_by: user._id }, { assigned_to: user._id }]);
    if (!load) {
      throw new BadRequestException('Nothing found');
    }
    return load;
  }

  async updateLoad(load: LoadDoc, updateLoadBodyDto: UpdateLoadBodyDto) {
    if (load.status !== LoadStatusEnum.NEW) {
      throw new BadRequestException(`You can't change load info because it's already posted`);
    }
    await this._loadModel.updateOne({ _id: load._id }, updateLoadBodyDto);
  }

  async deleteLoad(load: LoadDoc) {
    if (load.status === LoadStatusEnum.POSTED || load.status === LoadStatusEnum.ASSIGNED) {
      throw new BadRequestException(`You can't delete load while it's being delivered`);
    }
    await this._loadModel.deleteOne({ _id: load._id });
  }

  async postLoad(load: LoadDoc) {
    if (load.status !== LoadStatusEnum.NEW) {
      throw new BadRequestException('This load is already posted');
    }
    load.status = LoadStatusEnum.POSTED;
    load.logs.push({ message: 'Trying to post load' });
    await load.save();

    const truck = await this._trucksService.findTruckToLoad({
      payload: load.payload,
      dimensions: load.dimensions
    });
    if (!truck) {
      load.status = LoadStatusEnum.NEW;
      load.logs.push({ message: 'Driver not found' });
      await load.save();
      return { message: 'Driver not found', driver_found: false };
    }
    truck.status = TruckStatusEnum.OL;
    await truck.save();
    load.assigned_to = truck.assigned_to;
    load.logs.push({ message: `Load assigned to driver with id ${truck.assigned_to}` });
    load.status = LoadStatusEnum.ASSIGNED;
    load.logs.push({ message: `Load state changed to '${LoadStateEnum.EN_ROUTE_TO_PICK_UP}'` });
    load.state = LoadStateEnum.EN_ROUTE_TO_PICK_UP;
    await load.save();
    return { message: 'Load posted successfully', driver_found: true };
  }

}

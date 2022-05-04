import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TruckDoc, TruckSchemaName } from '~modules/trucks/schemas/truck.schema';
import { UserDoc } from '~modules/users/schemas/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { AddTruckDto } from '~modules/trucks/dtos/add-truck.dto';
import { UpdateTruckDto } from '~modules/trucks/dtos/update-truck.dto';
import { truckList } from '~modules/trucks/lists/truck.list';
import { TruckInterface } from '~modules/trucks/interfaces/truck.interface';
import { TruckStatusEnum } from '~modules/trucks/enums/truck-status.enum';
import { LoadDoc } from '~modules/loads/schemas/load.schema';

@Injectable()
export class TrucksService {
  constructor(
    @InjectModel(TruckSchemaName)
    private readonly _truckModel: Model<TruckDoc>
  ) {}

  async getAll(user: UserDoc) {
    return this._truckModel.find({ created_by: user._id });
  }

  async add(user: UserDoc, { type }: AddTruckDto) {
    const { payload, dimensions } = truckList[type];
    return this._truckModel.create({ created_by: user._id, type, payload, dimensions });
  }

  async findByTruckId(user: UserDoc, truckId: string) {
    const isTruckIdValid = isValidObjectId(truckId);
    if (!isTruckIdValid) {
      throw new BadRequestException('Nothing found');
    }
    const truck = await this._truckModel.findOne({ created_by: user._id, _id: truckId });
    if (!truck) {
      throw new BadRequestException('Nothing found');
    }
    return truck;
  }

  async findDriverLoadedTruck(user: UserDoc) {
    const truck = await this._truckModel.findOne({
      assigned_to: user._id,
      status: TruckStatusEnum.OL
    });
    if (!truck) {
      throw new BadRequestException('No loaded truck');
    }
    return truck;
  }

  async findLoadDriver(load: LoadDoc) {
    return this._truckModel.findOne({ assigned_to: load.assigned_to });
  }

  async findTruckToLoad({ payload, dimensions }: Pick<TruckInterface, 'payload' | 'dimensions'>) {
    const [truck] = await this._truckModel
      .where('assigned_to').ne(null)
      .where({ status: TruckStatusEnum.IS })
      .where('payload').gte(payload)
      .where('dimensions.height').gte(dimensions.height)
      .where('dimensions.length').gte(dimensions.length)
      .where('dimensions.width').gte(dimensions.width);
    return truck;
  }

  async update(truck: TruckDoc, updateTruckDto: UpdateTruckDto) {
    if (truck.status === TruckStatusEnum.OL) {
      throw new BadRequestException(`You can't update truck while it's on delivery`);
    }
    await this._truckModel.updateOne({ _id: truck._id }, updateTruckDto);
  }

  async delete(truck: TruckDoc) {
    if (truck.status === TruckStatusEnum.OL) {
      throw new BadRequestException(`You can't delete truck while it's on delivery`);
    }
    await this._truckModel.deleteOne({ _id: truck._id });
  }

  async assignTruck(truck: TruckDoc, user: UserDoc) {
    const hasTruckOnLoad = await this._truckModel.findOne({ created_by: user._id, status: TruckStatusEnum.OL });
    if (hasTruckOnLoad) {
      throw new BadRequestException(`You can't reassign truck while you have truck on delivery`);
    }
    await this._truckModel.updateOne({ assigned_to: user._id }, { assigned_to: null });
    await this._truckModel.updateOne({ _id: truck._id }, { assigned_to: user._id });
  }

}

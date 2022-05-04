import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDoc, UserSchemaName } from '~modules/users/schemas/user.schema';
import { UserInterface } from '~modules/users/interfaces/user.interface';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';
import { ChangePasswordDto } from '~modules/users/dtos/change-password.dto';
import { TruckDoc, TruckSchemaName } from '~modules/trucks/schemas/truck.schema';
import { LoadDoc, LoadSchemaName } from '~modules/loads/schemas/load.schema';
import { LoadStatusEnum } from '~modules/loads/enums/load-status.enum';
import { TruckStatusEnum } from '~modules/trucks/enums/truck-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaName)
    private readonly _userModel: Model<UserDoc>,
    @InjectModel(LoadSchemaName)
    private readonly _loadModel: Model<LoadDoc>,
    @InjectModel(TruckSchemaName)
    private readonly _truckModel: Model<TruckDoc>
  ) {}

  async create({ email, password, role }: Pick<UserInterface, 'email' | 'password' | 'role'>): Promise<UserDoc> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this._userModel.create({ email, password: hashedPassword, role });
  }

  async checkIsEmailUsed(email: string): Promise<void> {
    const user = await this._userModel.exists({ email });
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
  }

  async findByEmail(email: string): Promise<UserDoc> {
    const user = await this._userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(`User with this email doesn't exists`);
    }
    return user;
  }

  async findById(id: string): Promise<UserDoc> {
    const user = await this._userModel.findById(id);
    if (!user) {
      throw new BadRequestException('Wrong user id');
    }
    return user;
  }

  async verifyPassword(user: UserDoc, password): Promise<void> {
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new BadRequestException('Wrong password');
    }
  }

  async delete(user: UserDoc): Promise<void> {
    switch (user.role) {
      case UserRolesEnum.DRIVER:
        const truckOnLoad = await this._truckModel.findOne({
          created_by: user._id,
          status: TruckStatusEnum.OL
        });
        if (truckOnLoad) {
          throw new BadRequestException(`You can't delete profile while you have truck on load`);
        }
        await this._truckModel.deleteMany({ created_by: user._id });
        break;
      case UserRolesEnum.SHIPPER:
        const notDeliveredLoad = await this._loadModel.findOne({
          created_by: user._id,
          status: LoadStatusEnum.ASSIGNED
        });
        if (notDeliveredLoad) {
          throw new BadRequestException(`You can't delete profile while you have not delivered loads`);
        }
        await this._loadModel.deleteMany({ created_by: user._id });
        break;
    }
    await this._userModel.deleteOne({ _id: user._id });
  }

  async changePassword(
    user: UserDoc,
    { oldPassword, newPassword }: ChangePasswordDto
  ): Promise<void> {
    await this.verifyPassword(user, oldPassword);
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }

}

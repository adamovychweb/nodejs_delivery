import { ObjectId } from 'mongoose';
import { TruckTypesEnum } from '~modules/trucks/enums/truck-types.enum';
import { TruckStatusEnum } from '~modules/trucks/enums/truck-status.enum';
import { TruckDimensionsInterface } from '~modules/trucks/interfaces/truck-dimensions.interface';

export interface TruckInterface {
  _id: ObjectId;
  created_by: ObjectId;
  assigned_to: ObjectId | null;
  type: TruckTypesEnum;
  payload: number;
  dimensions: TruckDimensionsInterface;
  status: TruckStatusEnum;
  created_date: Date;
}

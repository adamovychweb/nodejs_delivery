import { ObjectId } from 'mongoose';
import { LoadStatusEnum } from '~modules/loads/enums/load-status.enum';
import { LoadStateEnum } from '~modules/loads/enums/load-state.enum';
import { LoadDimensionsInterface } from '~modules/loads/interfaces/load-dimensions.interface';
import { LoadLogInterface } from '~modules/loads/interfaces/load-log.interface';

export interface LoadInterface {
  _id: ObjectId;
  created_by: ObjectId;
  assigned_to: ObjectId | null;
  status: LoadStatusEnum;
  state: LoadStateEnum;
  name: string;
  payload: number;
  pickup_address: string;
  delivery_address: string;
  dimensions: LoadDimensionsInterface;
  logs: LoadLogInterface[];
  created_date: Date;
}

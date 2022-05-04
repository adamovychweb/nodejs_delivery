import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

import { TruckInterface } from '~modules/trucks/interfaces/truck.interface';
import { TruckTypesEnum } from '~modules/trucks/enums/truck-types.enum';
import { TruckStatusEnum } from '~modules/trucks/enums/truck-status.enum';
import { TruckDimensionsInterface } from '~modules/trucks/interfaces/truck-dimensions.interface';
import { TruckDimensionsSchema } from '~modules/trucks/schemas/truck-dimensions.schema';

type TruckSchemaInterface = Omit<TruckInterface, '_id' | 'created_date'>

@Schema({ versionKey: false })
export class Truck implements TruckSchemaInterface {

  @Prop({ type: Types.ObjectId, ref: 'User', immutable: true, required: true })
  created_by: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  assigned_to: ObjectId;

  @Prop({ required: true })
  type: TruckTypesEnum;

  @Prop({ required: true })
  payload: number;

  @Prop({ type: TruckDimensionsSchema, required: true })
  dimensions: TruckDimensionsInterface;

  @Prop({ default: TruckStatusEnum.IS })
  status: TruckStatusEnum;

  @Prop({ default: () => Date.now(), immutable: true })
  created_date: Date;
}

export type TruckDoc = Truck & Document
export const TruckSchema = SchemaFactory.createForClass(Truck);
export const TruckSchemaName = Truck.name;

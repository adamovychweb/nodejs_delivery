import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';

import { LoadInterface } from '~modules/loads/interfaces/load.interface';
import { LoadDimensionsInterface } from '~modules/loads/interfaces/load-dimensions.interface';
import { LoadDimensionsSchema } from '~modules/loads/schemas/load-dimensions.schema';
import { LoadLogSchema } from '~modules/loads/schemas/load-log.schema';
import { LoadLogInterface } from '~modules/loads/interfaces/load-log.interface';
import { LoadStateEnum } from '~modules/loads/enums/load-state.enum';
import { LoadStatusEnum } from '~modules/loads/enums/load-status.enum';

type LoadSchemaInterface = Omit<LoadInterface, '_id'>

@Schema({ versionKey: false })
export class Load implements LoadSchemaInterface {

  @Prop({ type: Types.ObjectId, ref: 'User', immutable: true, required: true })
  created_by: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  assigned_to: ObjectId | null;

  @Prop({ default: LoadStatusEnum.NEW })
  status: LoadStatusEnum;

  @Prop({ default: null })
  state: LoadStateEnum;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  payload: number;

  @Prop({ required: true })
  pickup_address: string;

  @Prop({ required: true })
  delivery_address: string;

  @Prop({ type: LoadDimensionsSchema, required: true })
  dimensions: LoadDimensionsInterface;

  @Prop({ type: [LoadLogSchema], default: [] })
  logs: LoadLogInterface[];

  @Prop({ default: () => Date.now(), immutable: true })
  created_date: Date;
}

export type LoadDoc = Load & Document
export const LoadSchema = SchemaFactory.createForClass(Load);
export const LoadSchemaName = Load.name;

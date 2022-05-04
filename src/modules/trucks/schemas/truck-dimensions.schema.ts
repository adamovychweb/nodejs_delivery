import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TruckDimensionsInterface } from '~modules/trucks/interfaces/truck-dimensions.interface';

@Schema({ versionKey: false, _id: false })
export class TruckDimensions implements TruckDimensionsInterface {

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  width: number;
}

export const TruckDimensionsSchema = SchemaFactory.createForClass(TruckDimensions);
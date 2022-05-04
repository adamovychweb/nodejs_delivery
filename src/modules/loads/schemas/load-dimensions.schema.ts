import { LoadDimensionsInterface } from '~modules/loads/interfaces/load-dimensions.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ versionKey: false, _id: false })
export class LoadDimensions implements LoadDimensionsInterface {

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  width: number;
}

export const LoadDimensionsSchema = SchemaFactory.createForClass(LoadDimensions);
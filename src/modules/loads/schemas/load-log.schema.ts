import { LoadLogInterface } from '~modules/loads/interfaces/load-log.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class LoadLog implements LoadLogInterface {

  @Prop({ required: true, immutable: true })
  message: string;

  @Prop({ default: () => Date.now(), immutable: true })
  time: Date;
}

export const LoadLogSchema = SchemaFactory.createForClass(LoadLog);

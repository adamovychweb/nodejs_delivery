import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserInterface } from '~modules/users/interfaces/user.interface';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';

type UserSchemaInterface = Omit<UserInterface, '_id'>

@Schema({ versionKey: false })
export class User implements UserSchemaInterface {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: UserRolesEnum;

  @Prop({ default: () => Date.now(), immutable: true })
  created_date: Date;

}

export type UserDoc = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserSchemaName = User.name;

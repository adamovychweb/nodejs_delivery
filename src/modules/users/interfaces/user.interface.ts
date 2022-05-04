import { ObjectId } from 'mongoose';

import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';

export interface UserInterface {
  _id: ObjectId;
  email: string;
  password: string;
  role: UserRolesEnum;
}

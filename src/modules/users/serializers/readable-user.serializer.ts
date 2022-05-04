import { UserDoc } from '~modules/users/schemas/user.schema';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';

export class ReadableUserSerializer {
  readonly _id: string;
  readonly role: UserRolesEnum;
  readonly email: string;
  readonly created_date: Date;

  constructor(user: UserDoc) {
    this._id = user._id.toString();
    this.role = user.role;
    this.email = user.email;
    this.created_date = user.created_date;
  }
}

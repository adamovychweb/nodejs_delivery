import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserInterface } from '~modules/users/interfaces/user.interface';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';

type UserValidationInterface = Pick<UserInterface, 'email' | 'password' | 'role'>

export class UserValidation implements UserValidationInterface {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRolesEnum)
  role: UserRolesEnum
}

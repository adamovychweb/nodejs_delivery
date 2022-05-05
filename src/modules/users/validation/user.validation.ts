import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserInterface } from '~modules/users/interfaces/user.interface';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

type UserValidationInterface = Pick<UserInterface, 'email' | 'password' | 'role'>

export class UserValidation implements UserValidationInterface {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: UserRolesEnum })
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;
}

import { SetMetadata } from '@nestjs/common';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';
import { USER_ROLE_KEY } from '~modules/users/constants/user-role-key';

export const UserRole = (role: UserRolesEnum) => SetMetadata(USER_ROLE_KEY, role);

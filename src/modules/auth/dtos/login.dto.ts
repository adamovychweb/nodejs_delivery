import { PickType } from '@nestjs/swagger';

import { UserValidation } from '~modules/users/validation/user.validation';

export class LoginDto extends PickType(UserValidation, ['email', 'password']) {}
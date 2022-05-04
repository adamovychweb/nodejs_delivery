import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRolesEnum } from '~modules/users/enums/user-roles.enum';
import { USER_ROLE_KEY } from '~modules/users/constants/user-role-key';
import { UserDoc } from '~modules/users/schemas/user.schema';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRolesEnum>(USER_ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRole) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user as UserDoc;
    return user.role === requiredRole;
  }
}

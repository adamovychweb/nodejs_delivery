import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
);

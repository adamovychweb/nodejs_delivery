import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { JwtTokensService } from '~modules/jwt-tokens/services/jwt-tokens.service';

@Injectable()
export class JwtTokenGuard implements CanActivate {
  constructor(
    private readonly _jwtTokensService: JwtTokensService
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const accessToken = this._jwtTokensService.getToken(req);
    req.user = await this._jwtTokensService.decodeToken(accessToken);
    return true;
  }
}

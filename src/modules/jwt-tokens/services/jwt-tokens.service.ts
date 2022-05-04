import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtConfigService } from '~core/config/services/jwt-config.service';
import { UsersService } from '~modules/users/services/users.service';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _jwtConfig: JwtConfigService,
    private readonly _usersService: UsersService
  ) {}

  async generateToken(payload: { id: string }) {
    return this._jwtService.sign(payload, {
      secret: this._jwtConfig.secret,
      expiresIn: this._jwtConfig.expiresIn
    });
  }

  async decodeToken(token: string) {
    try {
      const { id } = this._jwtService.verify(token, {
        secret: this._jwtConfig.secret
      });
      return this._usersService.findById(id);
    } catch {
      throw new UnauthorizedException('Token is not valid');
    }
  }

  getToken(req: Request) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedException('No Authorization token');
    }
    return authorization.split(' ')[1];
  }

}
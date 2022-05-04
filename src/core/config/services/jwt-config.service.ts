import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get secret() {
    const secret = this._configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new InternalServerErrorException('Please specify jwt secret at config');
    }
    return secret;
  }

  get expiresIn() {
    const expiresIn = this._configService.get<number>('JWT_EXPIRES_IN');
    return expiresIn || 86400;
  }

}
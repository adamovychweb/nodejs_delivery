import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private _configService: ConfigService) {}

  get port(): number {
    const port = this._configService.get<number>('APP_PORT');
    return port || 8080;
  }

}

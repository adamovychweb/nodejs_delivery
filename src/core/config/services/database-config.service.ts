import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get uri(): string {
    const uri = this._configService.get<string>('DB_URI');
    if (!uri) {
      throw new InternalServerErrorException('Please specify mongo connect uri at config');
    }
    return uri;
  }

}
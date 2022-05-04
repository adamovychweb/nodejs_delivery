import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from '~core/config/services/app-config.service';
import { DatabaseConfigService } from '~core/config/services/database-config.service';
import { JwtConfigService } from '~core/config/services/jwt-config.service';

@Module({
  imports: [ConfigModule],
  providers: [
    AppConfigService,
    DatabaseConfigService,
    JwtConfigService
  ],
  exports: [
    AppConfigService,
    DatabaseConfigService,
    JwtConfigService
  ]
})
export class CoreConfigModule {}
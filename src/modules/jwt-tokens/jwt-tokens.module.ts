import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CoreConfigModule } from '~core/config/core-config.module';
import { JwtTokensService } from '~modules/jwt-tokens/services/jwt-tokens.service';
import { UsersModule } from '~modules/users/users.module';

@Module({
  imports: [
    JwtModule.register({}),
    CoreConfigModule,
    UsersModule
  ],
  providers: [JwtTokensService],
  exports: [JwtTokensService]
})
export class JwtTokensModule {}

import { Module } from '@nestjs/common';

import { RootConfig } from '~core/config/root-config';
import { CoreConfigModule } from '~core/config/core-config.module';
import { CoreDatabaseModule } from '~core/database/core-database.module';
import { AuthModule } from '~modules/auth/auth.module';
import { UsersModule } from '~modules/users/users.module';
import { JwtTokensModule } from '~modules/jwt-tokens/jwt-tokens.module';
import { TrucksModule } from '~modules/trucks/trucks.module';
import { LoadsModule } from '~modules/loads/loads.module';

@Module({
  imports: [
    RootConfig,
    CoreConfigModule,
    CoreDatabaseModule,
    AuthModule,
    UsersModule,
    JwtTokensModule,
    TrucksModule,
    LoadsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

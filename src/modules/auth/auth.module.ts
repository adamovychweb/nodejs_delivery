import { Module } from '@nestjs/common';

import { JwtTokensModule } from '~modules/jwt-tokens/jwt-tokens.module';
import { AuthController } from '~modules/auth/controllers/auth.controller';
import { AuthService } from '~modules/auth/services/auth.service';
import { UsersModule } from '~modules/users/users.module';

@Module({
  imports: [JwtTokensModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

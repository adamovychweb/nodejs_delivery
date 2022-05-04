import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from '~modules/users/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaName } from '~modules/users/schemas/user.schema';
import { LoadSchema, LoadSchemaName } from '~modules/loads/schemas/load.schema';
import { TruckSchema, TruckSchemaName } from '~modules/trucks/schemas/truck.schema';
import { UsersController } from '~modules/users/controllers/users.controller';
import { JwtTokensModule } from '~modules/jwt-tokens/jwt-tokens.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaName, schema: UserSchema },
      { name: LoadSchemaName, schema: LoadSchema },
      { name: TruckSchemaName, schema: TruckSchema }
    ]),
    forwardRef(() => JwtTokensModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

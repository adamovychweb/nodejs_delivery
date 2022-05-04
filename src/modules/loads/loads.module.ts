import { Module } from '@nestjs/common';
import { LoadsController } from '~modules/loads/controllers/loads.controller';
import { LoadsService } from '~modules/loads/services/loads.service';
import { JwtTokensModule } from '~modules/jwt-tokens/jwt-tokens.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoadSchema, LoadSchemaName } from '~modules/loads/schemas/load.schema';
import { TrucksModule } from '~modules/trucks/trucks.module';
import { UsersModule } from '~modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LoadSchemaName, schema: LoadSchema }]),
    JwtTokensModule,
    TrucksModule,
    UsersModule
  ],
  controllers: [LoadsController],
  providers: [LoadsService]
})
export class LoadsModule {}

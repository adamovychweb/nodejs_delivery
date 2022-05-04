import { Module } from '@nestjs/common';

import { TrucksController } from '~modules/trucks/controllers/trucks.controller';
import { TrucksService } from '~modules/trucks/services/trucks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TruckSchema, TruckSchemaName } from '~modules/trucks/schemas/truck.schema';
import { JwtTokensModule } from '~modules/jwt-tokens/jwt-tokens.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TruckSchemaName, schema: TruckSchema }]),
    JwtTokensModule
  ],
  controllers: [TrucksController],
  providers: [TrucksService],
  exports: [TrucksService]
})
export class TrucksModule {}

import { MongooseModule } from '@nestjs/mongoose';

import { CoreConfigModule } from '~core/config/core-config.module';
import { DatabaseConfigService } from '~core/config/services/database-config.service';

export const CoreDatabaseModule = MongooseModule.forRootAsync({
  imports: [CoreConfigModule],
  inject: [DatabaseConfigService],
  useFactory: (databaseConfigService: DatabaseConfigService) => ({
    uri: databaseConfigService.uri
  })
});

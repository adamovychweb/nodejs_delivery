import { ConfigModule } from '@nestjs/config';

export const RootConfig = ConfigModule.forRoot({
  envFilePath: 'config/.env'
});
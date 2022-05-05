import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppConfigService } from '~core/config/services/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Delivery company API')
    .setDescription('Delivery company API with drivers and customers')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Users')
    .addTag('Trucks')
    .addTag('Loads')
    .addTag('Auth')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  const appConfig = app.get(AppConfigService);
  await app.listen(appConfig.port);
  console.log(`App started on port: ${appConfig.port}`);
  console.log(`API docs: http://localhost:${appConfig.port}/api-docs`);
}

bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { IAppConfig } from '@aiofc/config';
import { Logger } from '@aiofc/logger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const pino = app.get(Logger);
  app.useLogger(pino);
  const configService = app.get(ConfigService);
  // const { port, globalPrefix } = configService.get<IAppConfig>('app', {
  //   infer: true,
  // });
  const config = configService.get<IAppConfig>('app');
  console.log(config);
  app.setGlobalPrefix(config?.globalPrefix ?? '');
  await app.listen(config?.port ?? 3000);
  pino.log(
    `🚀 Application is running on: http://localhost:${config?.port}/${config?.globalPrefix}`
  );
}

bootstrap();

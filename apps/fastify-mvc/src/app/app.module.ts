import path from 'path';

import { setupConfigModule } from '@aiofc/config';
import { setupLoggerModule } from '@aiofc/logger';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    setupConfigModule(
      path.join(__dirname, 'assets', 'config.development.yaml')
    ),
    setupLoggerModule(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

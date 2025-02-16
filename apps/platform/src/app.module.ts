import path from 'path';

import { setupConfigModule } from '@aiofc/config';
import { setupLoggerModule } from '@aiofc/logger';
import { Module } from '@nestjs/common';

import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { setupClsModule } from '~/infrastructure/cache/cls-setup';
import { setupI18nModule } from '~/infrastructure/i18n/i18n-setup';

@Module({
  imports: [
    setupConfigModule(
      path.join(__dirname, 'assets', 'config.development.yaml')
    ),
    setupLoggerModule(),
    setupClsModule(),
    setupI18nModule(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { join } from 'path';

import { ConfigModule } from '@aiofc/config';
import { setupLoggerModule } from '@aiofc/logger';
import { Module } from '@nestjs/common';

import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { setupClsModule } from '~/infrastructure/cache/cls-setup';
import { setupI18nModule } from '~/infrastructure/i18n/i18n-setup';

@Module({
  imports: [
    ConfigModule.forRoot(join(__dirname, '')),
    setupClsModule(),
    setupLoggerModule(),
    setupI18nModule(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

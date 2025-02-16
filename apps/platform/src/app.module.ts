import path from 'path';

import { setupConfigModule } from '@aiofc/config';
import { setupLoggerModule } from '@aiofc/logger';
import { Module } from '@nestjs/common';

import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { setupClsModule } from '~/infrastructure/cache/cls-setup';
import { setupThrottlerModule } from '~/infrastructure/http-server/throtter-setup';
import { setupI18nModule } from '~/infrastructure/i18n/i18n-setup';

@Module({
  imports: [
    // 配置模块，应当在所有模块之前导入，因为这是一个全局模块，其他模块需要使用 ConfigService
    setupConfigModule(
      path.join(__dirname, 'assets', 'config.development.yaml')
    ),
    // 日志模块
    setupLoggerModule(),
    // 缓存模块
    setupClsModule(),
    // 国际化模块
    setupI18nModule(),
    // 限流模块
    setupThrottlerModule(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

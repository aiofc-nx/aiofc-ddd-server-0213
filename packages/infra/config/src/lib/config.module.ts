import { Global, Module, DynamicModule } from '@nestjs/common';

import { ConfigService } from './config.service';

/**
 * ConfigModule
 *
 * 职责：
 * 1. 提供全局配置服务
 * 2. 管理配置的加载和注入
 * 3. 确保配置的单例性
 */
@Global()
@Module({})
export class ConfigModule {
  static forRoot(configDir: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useFactory: () => new ConfigService(configDir),
        },
      ],
      exports: [ConfigService],
    };
  }
}

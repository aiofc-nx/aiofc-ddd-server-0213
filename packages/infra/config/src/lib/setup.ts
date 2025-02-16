import * as fs from 'fs';

import { DynamicModule } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';

import {
  configSchema,
  IAppConfig,
  IDatabaseConfig,
  ILoggerConfig,
} from './config.schema';

const validateConfig = (yamlFilePath: string) => {
  const config = yaml.load(fs.readFileSync(yamlFilePath, 'utf8')) as Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  console.log(
    `已读取文件：${yamlFilePath} \n ${JSON.stringify(config, null, 2)}`
  );
  // 校验配置项
  const parsedConfig = configSchema.safeParse(config); // 使用 Zod 进行校验
  if (!parsedConfig.success) {
    throw new Error(`配置验证失败: ${JSON.stringify(parsedConfig.error)}`);
  } else {
    console.log(`配置验证通过!`);
  }
  return parsedConfig;
};

export const setupConfigModule: (
  yamlFilePath: string
) => Promise<DynamicModule> = async (yamlFilePath) => {
  const parsedConfig = validateConfig(yamlFilePath) as {
    success: true;
    data: { app: IAppConfig; logger: ILoggerConfig; database: IDatabaseConfig };
  };

  const AppConfig = registerAs('app', () => parsedConfig.data.app);

  const LoggerConfig = registerAs('logger', () => parsedConfig.data.logger);

  const DatabaseConfig = registerAs(
    'database',
    () => parsedConfig.data.database
  );
  return ConfigModule.forRoot({
    isGlobal: true,
    load: [AppConfig, LoggerConfig, DatabaseConfig], // 传入 YAML 文件路径
  });
};

// export interface AllConfigType {
//   [appConfigToken]: IAppConfig;
//   [loggerConfigToken]: ILoggerConfig;
//   [databaseConfigToken]: IDatabaseConfig;
// }

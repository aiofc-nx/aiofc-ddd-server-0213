import { z } from 'zod';

// 定义 App 配置的校验规则
export const appZodSchema = z.object({
  port: z.number().min(1).default(3000), // API服务端口，默认3000
  globalPrefix: z.string().default('api'), // API全局路由前缀，默认'api'
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'), // 环境变量，默认'development'
});

// 定义 Logger 配置的校验规则
export const loggerZodSchema = z.object({
  colorize: z.boolean().default(false),
  prettyLogs: z.boolean().default(false),
  defaultLevel: z.string().default('info'),
});

// 定义 Database 配置的校验规则
export const databaseZodSchema = z.object({
  user: z.string(), // 数据库用户名
  password: z.string(), // 数据库密码
  host: z.string(), // 数据库主机地址
  port: z.coerce.number().default(5432),
  name: z.string(), // 数据库名称
});

// 合并所有配置的校验规则
export const configSchema = z.object({
  app: appZodSchema,
  logger: loggerZodSchema,
  database: databaseZodSchema,
});

// 提取配置类型
export type IAppConfig = z.infer<typeof appZodSchema>;
export type ILoggerConfig = z.infer<typeof loggerZodSchema>;
export type IDatabaseConfig = z.infer<typeof databaseZodSchema>;

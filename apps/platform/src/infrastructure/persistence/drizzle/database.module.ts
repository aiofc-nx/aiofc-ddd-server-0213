import { IDatabaseConfig } from '@aiofc/config';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_DRIZZLE_PG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IDatabaseConfig>) => {
        const databasePool = new Pool({
          host: configService.get('host'),
          user: configService.get('user'),
          password: configService.get('password'),
          database: configService.get('name'),
          port: configService.get('port'),
        });

        return drizzle(databasePool);
      },
    },
  ],
  exports: ['DATABASE_DRIZZLE_PG'],
})
export class DatabaseModule {}

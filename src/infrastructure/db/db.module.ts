import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DbClient } from './db.client';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DbClient,
      useFactory: (config: ConfigService) => {
        const pool = new Pool({
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT') ?? 5432),
          user: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          max: Number(config.get<string>('DB_POOL_MAX') ?? 10),
        });
        return new DbClient(pool);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DbClient],
})
export class DbModule {}

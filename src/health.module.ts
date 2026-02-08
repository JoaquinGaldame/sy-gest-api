import { Module } from '@nestjs/common';
import { DbModule } from './infrastructure/db/db.module';
import { HealthController } from './interfaces/http/health/controllers/health.controller';

@Module({
  imports: [DbModule],
  controllers: [HealthController],
})
export class HealthModule {}

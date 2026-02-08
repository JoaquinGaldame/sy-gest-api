import { Controller, Get } from '@nestjs/common';
import { DbClient } from '../../../../infrastructure/db/db.client';

@Controller()
export class HealthController {
  constructor(private readonly db: DbClient) {}

  @Get('health')
  health() {
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const timestamp = formatter.format(new Date()).replace(' ', 'T');

    return {
      status: 'healthy',
      timestamp,
    };
  }

  @Get('ready')
  async ready() {
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const timestamp = formatter.format(new Date()).replace(' ', 'T');
    try {
      await this.db.query('SELECT 1');
      return {
        status: 'up',
        database: 'connected',
        timestamp,
      };
    } catch {
      return {
        status: 'down',
        error: 'Database connection refused',
        timestamp,
      };
    }
  }
}

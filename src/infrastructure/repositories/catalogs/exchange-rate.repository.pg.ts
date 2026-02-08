import {
  ExchangeRateRepository,
  ExchangeRateRow,
} from '../../../application/ports/catalogs/exchange-rate.repository';
import { DbClient } from '../../db/db.client';

export class ExchangeRateRepositoryPg implements ExchangeRateRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<ExchangeRateRow[]> {
    const result = await this.db.query<ExchangeRateRow>(
      `SELECT id, base_currency_id, quote_currency_id, rate, source, effective_at, fetched_at
       FROM exchange_rate ORDER BY effective_at DESC`,
    );
    return result.rows;
  }

  async findById(id: number): Promise<ExchangeRateRow | null> {
    const result = await this.db.query<ExchangeRateRow>(
      `SELECT id, base_currency_id, quote_currency_id, rate, source, effective_at, fetched_at
       FROM exchange_rate WHERE id = $1`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(
    input: Omit<ExchangeRateRow, 'id' | 'fetched_at'>,
  ): Promise<ExchangeRateRow> {
    const result = await this.db.query<ExchangeRateRow>(
      `INSERT INTO exchange_rate (base_currency_id, quote_currency_id, rate, source, effective_at)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, base_currency_id, quote_currency_id, rate, source, effective_at, fetched_at`,
      [
        input.base_currency_id,
        input.quote_currency_id,
        input.rate,
        input.source,
        input.effective_at,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: Omit<ExchangeRateRow, 'id' | 'fetched_at'>,
  ): Promise<ExchangeRateRow | null> {
    const result = await this.db.query<ExchangeRateRow>(
      `UPDATE exchange_rate
       SET base_currency_id = $1, quote_currency_id = $2, rate = $3, source = $4, effective_at = $5
       WHERE id = $6
       RETURNING id, base_currency_id, quote_currency_id, rate, source, effective_at, fetched_at`,
      [
        input.base_currency_id,
        input.quote_currency_id,
        input.rate,
        input.source,
        input.effective_at,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query(
      'DELETE FROM exchange_rate WHERE id = $1',
      [id],
    );
    return (result.rowCount ?? 0) > 0;
  }
}

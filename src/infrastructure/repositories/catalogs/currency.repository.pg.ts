import {
  CurrencyRepository,
  CurrencyRow,
} from '../../../application/ports/catalogs/currency.repository';
import { DbClient } from '../../db/db.client';

export class CurrencyRepositoryPg implements CurrencyRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<CurrencyRow[]> {
    const result = await this.db.query<CurrencyRow>(
      'SELECT id, code, name_en, name_es, symbol, minor_unit, active FROM currency ORDER BY code',
    );
    return result.rows;
  }

  async findById(id: number): Promise<CurrencyRow | null> {
    const result = await this.db.query<CurrencyRow>(
      'SELECT id, code, name_en, name_es, symbol, minor_unit, active FROM currency WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: Omit<CurrencyRow, 'id'>): Promise<CurrencyRow> {
    const result = await this.db.query<CurrencyRow>(
      `INSERT INTO currency (code, name_en, name_es, symbol, minor_unit, active)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id, code, name_en, name_es, symbol, minor_unit, active`,
      [
        input.code,
        input.name_en,
        input.name_es,
        input.symbol,
        input.minor_unit,
        input.active,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: Omit<CurrencyRow, 'id'>,
  ): Promise<CurrencyRow | null> {
    const result = await this.db.query<CurrencyRow>(
      `UPDATE currency
       SET code = $1, name_en = $2, name_es = $3, symbol = $4, minor_unit = $5, active = $6
       WHERE id = $7
       RETURNING id, code, name_en, name_es, symbol, minor_unit, active`,
      [
        input.code,
        input.name_en,
        input.name_es,
        input.symbol,
        input.minor_unit,
        input.active,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM currency WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }
}

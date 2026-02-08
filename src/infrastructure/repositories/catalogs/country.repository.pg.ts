import {
  CountryRepository,
  CountryRow,
} from '../../../application/ports/catalogs/country.repository';
import { DbClient } from '../../db/db.client';

export class CountryRepositoryPg implements CountryRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<CountryRow[]> {
    const result = await this.db.query<CountryRow>(
      `SELECT id, iso2, iso3, name_es, name_en, phone_code, currency_code, timezone, active
       FROM country ORDER BY name_es`,
    );
    return result.rows;
  }

  async findById(id: number): Promise<CountryRow | null> {
    const result = await this.db.query<CountryRow>(
      `SELECT id, iso2, iso3, name_es, name_en, phone_code, currency_code, timezone, active
       FROM country WHERE id = $1`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: Omit<CountryRow, 'id'>): Promise<CountryRow> {
    const result = await this.db.query<CountryRow>(
      `INSERT INTO country (iso2, iso3, name_es, name_en, phone_code, currency_code, timezone, active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, iso2, iso3, name_es, name_en, phone_code, currency_code, timezone, active`,
      [
        input.iso2,
        input.iso3,
        input.name_es,
        input.name_en,
        input.phone_code,
        input.currency_code,
        input.timezone,
        input.active,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: Omit<CountryRow, 'id'>,
  ): Promise<CountryRow | null> {
    const result = await this.db.query<CountryRow>(
      `UPDATE country
       SET iso2 = $1, iso3 = $2, name_es = $3, name_en = $4, phone_code = $5,
           currency_code = $6, timezone = $7, active = $8
       WHERE id = $9
       RETURNING id, iso2, iso3, name_es, name_en, phone_code, currency_code, timezone, active`,
      [
        input.iso2,
        input.iso3,
        input.name_es,
        input.name_en,
        input.phone_code,
        input.currency_code,
        input.timezone,
        input.active,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM country WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }
}

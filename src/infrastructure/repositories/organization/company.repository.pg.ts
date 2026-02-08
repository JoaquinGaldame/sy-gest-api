import {
  CompanyRepository,
  CompanyRow,
} from '../../../application/ports/organization/company.repository';
import { DbClient } from '../../db/db.client';

export class CompanyRepositoryPg implements CompanyRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<CompanyRow[]> {
    const result = await this.db.query<CompanyRow>(
      `SELECT id, name, legal_name, tax_id, tax_type, website, logo, phone, email, address, city,
              country_id, default_timezone, default_language, default_currency
       FROM company ORDER BY name`,
    );
    return result.rows;
  }

  async findById(id: number): Promise<CompanyRow | null> {
    const result = await this.db.query<CompanyRow>(
      `SELECT id, name, legal_name, tax_id, tax_type, website, logo, phone, email, address, city,
              country_id, default_timezone, default_language, default_currency
       FROM company WHERE id = $1`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: Omit<CompanyRow, 'id'>): Promise<CompanyRow> {
    const result = await this.db.query<CompanyRow>(
      `INSERT INTO company
        (name, legal_name, tax_id, tax_type, website, logo, phone, email, address, city,
         country_id, default_timezone, default_language, default_currency)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING id, name, legal_name, tax_id, tax_type, website, logo, phone, email, address, city,
                 country_id, default_timezone, default_language, default_currency`,
      [
        input.name,
        input.legal_name,
        input.tax_id,
        input.tax_type,
        input.website,
        input.logo,
        input.phone,
        input.email,
        input.address,
        input.city,
        input.country_id,
        input.default_timezone,
        input.default_language,
        input.default_currency,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: Omit<CompanyRow, 'id'>,
  ): Promise<CompanyRow | null> {
    const result = await this.db.query<CompanyRow>(
      `UPDATE company
       SET name = $1, legal_name = $2, tax_id = $3, tax_type = $4, website = $5, logo = $6,
           phone = $7, email = $8, address = $9, city = $10, country_id = $11,
           default_timezone = $12, default_language = $13, default_currency = $14,
           updated_at = now()
       WHERE id = $15
       RETURNING id, name, legal_name, tax_id, tax_type, website, logo, phone, email, address, city,
                 country_id, default_timezone, default_language, default_currency`,
      [
        input.name,
        input.legal_name,
        input.tax_id,
        input.tax_type,
        input.website,
        input.logo,
        input.phone,
        input.email,
        input.address,
        input.city,
        input.country_id,
        input.default_timezone,
        input.default_language,
        input.default_currency,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM company WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }
}

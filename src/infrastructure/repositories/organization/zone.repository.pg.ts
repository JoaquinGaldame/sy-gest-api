import {
  ZoneRepository,
  ZoneRow,
} from '../../../application/ports/organization/zone.repository';
import { DbClient } from '../../db/db.client';

export class ZoneRepositoryPg implements ZoneRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<ZoneRow[]> {
    const result = await this.db.query<ZoneRow>(
      'SELECT id, code, name FROM zone ORDER BY name',
    );
    return result.rows;
  }

  async findById(id: number): Promise<ZoneRow | null> {
    const result = await this.db.query<ZoneRow>(
      'SELECT id, code, name FROM zone WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: { code: string; name: string }): Promise<ZoneRow> {
    const result = await this.db.query<ZoneRow>(
      'INSERT INTO zone (code, name) VALUES ($1, $2) RETURNING id, code, name',
      [input.code, input.name],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: { code: string; name: string },
  ): Promise<ZoneRow | null> {
    const result = await this.db.query<ZoneRow>(
      'UPDATE zone SET code = $1, name = $2 WHERE id = $3 RETURNING id, code, name',
      [input.code, input.name, id],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM zone WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}

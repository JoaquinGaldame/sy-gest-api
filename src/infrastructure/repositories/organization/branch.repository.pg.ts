import {
  BranchRepository,
  BranchRow,
} from '../../../application/ports/organization/branch.repository';
import { DbClient } from '../../db/db.client';

export class BranchRepositoryPg implements BranchRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<BranchRow[]> {
    const result = await this.db.query<BranchRow>(
      'SELECT id, company_id, zone_id, code, name FROM branch ORDER BY name',
    );
    return result.rows;
  }

  async listByZone(zone_id: number): Promise<BranchRow[]> {
    const result = await this.db.query<BranchRow>(
      'SELECT id, company_id, zone_id, code, name FROM branch WHERE zone_id = $1 ORDER BY name',
      [zone_id],
    );
    return result.rows;
  }

  async findById(id: number): Promise<BranchRow | null> {
    const result = await this.db.query<BranchRow>(
      'SELECT id, company_id, zone_id, code, name FROM branch WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: {
    company_id: number;
    zone_id: number;
    code: string;
    name: string;
  }): Promise<BranchRow> {
    const result = await this.db.query<BranchRow>(
      'INSERT INTO branch (company_id, zone_id, code, name) VALUES ($1, $2, $3, $4) RETURNING id, company_id, zone_id, code, name',
      [input.company_id, input.zone_id, input.code, input.name],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: { company_id: number; zone_id: number; code: string; name: string },
  ): Promise<BranchRow | null> {
    const result = await this.db.query<BranchRow>(
      'UPDATE branch SET company_id = $1, zone_id = $2, code = $3, name = $4 WHERE id = $5 RETURNING id, company_id, zone_id, code, name',
      [input.company_id, input.zone_id, input.code, input.name, id],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM branch WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }
}

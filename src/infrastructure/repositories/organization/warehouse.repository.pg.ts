import {
  WarehouseRepository,
  WarehouseRow,
} from '../../../application/ports/organization/warehouse.repository';
import { DbClient } from '../../db/db.client';

export class WarehouseRepositoryPg implements WarehouseRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<WarehouseRow[]> {
    const result = await this.db.query<WarehouseRow>(
      'SELECT id, branch_id, code, name, description, max_rows, max_columns FROM warehouse ORDER BY name',
    );
    return result.rows;
  }

  async listByBranch(branch_id: number): Promise<WarehouseRow[]> {
    const result = await this.db.query<WarehouseRow>(
      'SELECT id, branch_id, code, name, description, max_rows, max_columns FROM warehouse WHERE branch_id = $1 ORDER BY name',
      [branch_id],
    );
    return result.rows;
  }

  async listByZone(zone_id: number): Promise<WarehouseRow[]> {
    const result = await this.db.query<WarehouseRow>(
      `SELECT w.id, w.branch_id, w.code, w.name, w.description, w.max_rows, w.max_columns
       FROM warehouse w
       INNER JOIN branch b ON b.id = w.branch_id
       WHERE b.zone_id = $1
       ORDER BY w.name`,
      [zone_id],
    );
    return result.rows;
  }

  async findById(id: number): Promise<WarehouseRow | null> {
    const result = await this.db.query<WarehouseRow>(
      'SELECT id, branch_id, code, name, description, max_rows, max_columns FROM warehouse WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: {
    branch_id: number;
    code: string;
    name: string;
    description: string | null;
    max_rows: number;
    max_columns: number;
  }): Promise<WarehouseRow> {
    const result = await this.db.query<WarehouseRow>(
      `INSERT INTO warehouse (branch_id, code, name, description, max_rows, max_columns)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, branch_id, code, name, description, max_rows, max_columns`,
      [
        input.branch_id,
        input.code,
        input.name,
        input.description,
        input.max_rows,
        input.max_columns,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: {
      branch_id: number;
      code: string;
      name: string;
      description: string | null;
      max_rows: number;
      max_columns: number;
    },
  ): Promise<WarehouseRow | null> {
    const result = await this.db.query<WarehouseRow>(
      `UPDATE warehouse
       SET branch_id = $1, code = $2, name = $3, description = $4, max_rows = $5, max_columns = $6
       WHERE id = $7
       RETURNING id, branch_id, code, name, description, max_rows, max_columns`,
      [
        input.branch_id,
        input.code,
        input.name,
        input.description,
        input.max_rows,
        input.max_columns,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM warehouse WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }
}

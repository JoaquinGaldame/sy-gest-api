import {
  DepartmentRepository,
  DepartmentRow,
} from '../../../application/ports/catalogs/departments.repository';
import { DbClient } from '../../db/db.client';

export class DepartmentRepositoryPg implements DepartmentRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<DepartmentRow[]> {
    const result = await this.db.query<DepartmentRow>(
      'SELECT id, code, name_es, name_en, active FROM departments ORDER BY name_es',
    );
    return result.rows;
  }

  async findById(id: number): Promise<DepartmentRow | null> {
    const result = await this.db.query<DepartmentRow>(
      'SELECT id, code, name_es, name_en, active FROM departments WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: Omit<DepartmentRow, 'id'>): Promise<DepartmentRow> {
    const result = await this.db.query<DepartmentRow>(
      `INSERT INTO departments (code, name_es, name_en, active)
       VALUES ($1,$2,$3,$4)
       RETURNING id, code, name_es, name_en, active`,
      [input.code, input.name_es, input.name_en, input.active],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: Omit<DepartmentRow, 'id'>,
  ): Promise<DepartmentRow | null> {
    const result = await this.db.query<DepartmentRow>(
      `UPDATE departments
       SET code = $1, name_es = $2, name_en = $3, active = $4
       WHERE id = $5
       RETURNING id, code, name_es, name_en, active`,
      [input.code, input.name_es, input.name_en, input.active, id],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query(
      'DELETE FROM departments WHERE id = $1',
      [id],
    );
    return (result.rowCount ?? 0) > 0;
  }
}

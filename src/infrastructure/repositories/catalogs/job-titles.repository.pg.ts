import {
  JobTitleRepository,
  JobTitleRow,
} from '../../../application/ports/catalogs/job-titles.repository';
import { DbClient } from '../../db/db.client';

export class JobTitleRepositoryPg implements JobTitleRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<JobTitleRow[]> {
    const result = await this.db.query<JobTitleRow>(
      'SELECT id, code, name_es, name_en, department_id, active FROM job_titles ORDER BY name_es',
    );
    return result.rows;
  }

  async findById(id: number): Promise<JobTitleRow | null> {
    const result = await this.db.query<JobTitleRow>(
      'SELECT id, code, name_es, name_en, department_id, active FROM job_titles WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: Omit<JobTitleRow, 'id'>): Promise<JobTitleRow> {
    const result = await this.db.query<JobTitleRow>(
      `INSERT INTO job_titles (code, name_es, name_en, department_id, active)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, code, name_es, name_en, department_id, active`,
      [
        input.code,
        input.name_es,
        input.name_en,
        input.department_id,
        input.active,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: Omit<JobTitleRow, 'id'>,
  ): Promise<JobTitleRow | null> {
    const result = await this.db.query<JobTitleRow>(
      `UPDATE job_titles
       SET code = $1, name_es = $2, name_en = $3, department_id = $4, active = $5
       WHERE id = $6
       RETURNING id, code, name_es, name_en, department_id, active`,
      [
        input.code,
        input.name_es,
        input.name_en,
        input.department_id,
        input.active,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM job_titles WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }
}

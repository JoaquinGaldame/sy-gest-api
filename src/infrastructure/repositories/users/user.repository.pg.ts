import {
  UserAuthRow,
  UserRepository,
  UserRow,
} from '../../../application/ports/users/user.repository';
import {
  UserProfileRepository,
  UserProfileRow,
} from '../../../application/ports/users/user-profile.repository';
import {
  UserGroupRepository,
  UserGroupRow,
} from '../../../application/ports/auth/user-group.repository';
import { DbClient } from '../../db/db.client';

export class UserRepositoryPg implements UserRepository {
  constructor(private readonly db: DbClient) {}

  async findAuthByEmail(email: string): Promise<UserAuthRow | null> {
    const result = await this.db.query<UserAuthRow>(
      'SELECT id, username, email, password_hash, group_id, super_user, active FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0] ?? null;
  }

  async findById(id: string): Promise<UserRow | null> {
    const result = await this.db.query<UserRow>(
      'SELECT id, username, email, group_id, super_user, active FROM users WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async list(): Promise<UserRow[]> {
    const result = await this.db.query<UserRow>(
      'SELECT id, username, email, group_id, super_user, active FROM users ORDER BY created_at DESC',
    );
    return result.rows;
  }

  async create(input: {
    username: string;
    email: string;
    password_hash: string;
    group_id: number | null;
    super_user: boolean;
    active: boolean;
  }): Promise<UserRow> {
    const result = await this.db.query<UserRow>(
      `INSERT INTO users (username, email, password_hash, group_id, super_user, active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, group_id, super_user, active`,
      [
        input.username,
        input.email,
        input.password_hash,
        input.group_id,
        input.super_user,
        input.active,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: string,
    input: {
      username: string;
      email: string;
      group_id: number | null;
      super_user: boolean;
      active: boolean;
    },
  ): Promise<UserRow | null> {
    const result = await this.db.query<UserRow>(
      `UPDATE users
       SET username = $1, email = $2, group_id = $3, super_user = $4, active = $5, updated_at = now()
       WHERE id = $6
       RETURNING id, username, email, group_id, super_user, active`,
      [
        input.username,
        input.email,
        input.group_id,
        input.super_user,
        input.active,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.db.query(
      'UPDATE users SET active = false, updated_at = now() WHERE id = $1',
      [id],
    );
    return (result.rowCount ?? 0) > 0;
  }
}

export class UserProfileRepositoryPg implements UserProfileRepository {
  constructor(private readonly db: DbClient) {}

  async findByUserId(user_id: string): Promise<UserProfileRow | null> {
    const result = await this.db.query<UserProfileRow>(
      `SELECT id, user_id, first_name, last_name, document_type, document_number, phone_number,
              email_alternative, country_id, city, timezone, address, language, department_id,
              job_title_id, prefers_dark_mode
       FROM users_profile
       WHERE user_id = $1`,
      [user_id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: Omit<UserProfileRow, 'id'>): Promise<UserProfileRow> {
    const result = await this.db.query<UserProfileRow>(
      `INSERT INTO users_profile
        (user_id, first_name, last_name, document_type, document_number, phone_number,
         email_alternative, country_id, city, timezone, address, language, department_id,
         job_title_id, prefers_dark_mode)
       VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING id, user_id, first_name, last_name, document_type, document_number, phone_number,
                 email_alternative, country_id, city, timezone, address, language, department_id,
                 job_title_id, prefers_dark_mode`,
      [
        input.user_id,
        input.first_name,
        input.last_name,
        input.document_type,
        input.document_number,
        input.phone_number,
        input.email_alternative,
        input.country_id,
        input.city,
        input.timezone,
        input.address,
        input.language,
        input.department_id,
        input.job_title_id,
        input.prefers_dark_mode,
      ],
    );
    return result.rows[0];
  }

  async update(
    user_id: string,
    input: Omit<UserProfileRow, 'id' | 'user_id'>,
  ): Promise<UserProfileRow | null> {
    const result = await this.db.query<UserProfileRow>(
      `UPDATE users_profile
       SET first_name = $1, last_name = $2, document_type = $3, document_number = $4,
           phone_number = $5, email_alternative = $6, country_id = $7, city = $8,
           timezone = $9, address = $10, language = $11, department_id = $12,
           job_title_id = $13, prefers_dark_mode = $14, updated_at = now()
       WHERE user_id = $15
       RETURNING id, user_id, first_name, last_name, document_type, document_number, phone_number,
                 email_alternative, country_id, city, timezone, address, language, department_id,
                 job_title_id, prefers_dark_mode`,
      [
        input.first_name,
        input.last_name,
        input.document_type,
        input.document_number,
        input.phone_number,
        input.email_alternative,
        input.country_id,
        input.city,
        input.timezone,
        input.address,
        input.language,
        input.department_id,
        input.job_title_id,
        input.prefers_dark_mode,
        user_id,
      ],
    );
    return result.rows[0] ?? null;
  }
}

export class UserGroupRepositoryPg implements UserGroupRepository {
  constructor(private readonly db: DbClient) {}

  async list(): Promise<UserGroupRow[]> {
    const result = await this.db.query<UserGroupRow>(
      'SELECT id, code, name, zone_id, branch_id, active FROM user_group ORDER BY name',
    );
    return result.rows;
  }

  async findById(id: number): Promise<UserGroupRow | null> {
    const result = await this.db.query<UserGroupRow>(
      'SELECT id, code, name, zone_id, branch_id, active FROM user_group WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: {
    code: string;
    name: string;
    zone_id: number | null;
    branch_id: number | null;
    active: boolean;
  }): Promise<UserGroupRow> {
    const result = await this.db.query<UserGroupRow>(
      `INSERT INTO user_group (code, name, zone_id, branch_id, active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, code, name, zone_id, branch_id, active`,
      [input.code, input.name, input.zone_id, input.branch_id, input.active],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    input: {
      code: string;
      name: string;
      zone_id: number | null;
      branch_id: number | null;
      active: boolean;
    },
  ): Promise<UserGroupRow | null> {
    const result = await this.db.query<UserGroupRow>(
      `UPDATE user_group
       SET code = $1, name = $2, zone_id = $3, branch_id = $4, active = $5
       WHERE id = $6
       RETURNING id, code, name, zone_id, branch_id, active`,
      [
        input.code,
        input.name,
        input.zone_id,
        input.branch_id,
        input.active,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query('DELETE FROM user_group WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }
}

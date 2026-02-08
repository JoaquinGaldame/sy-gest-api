import { SessionRepository } from '../../../application/ports/auth/session.repository';
import { DbClient } from '../../db/db.client';

type SessionRow = {
  id: string;
  user_id: string;
  refresh_token_hash: string;
  revoked_at: string | null;
};

type SessionIdRow = {
  id: string;
};

export class SessionRepositoryPg implements SessionRepository {
  constructor(private readonly db: DbClient) {}

  async findById(id: string): Promise<SessionRow | null> {
    const result = await this.db.query<SessionRow>(
      'SELECT id, user_id, refresh_token_hash, revoked_at FROM sessions WHERE id = $1',
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(input: {
    user_id: string;
    refresh_token_hash: string;
    ip: string | null;
    user_agent: string | null;
  }): Promise<SessionIdRow> {
    const result = await this.db.query<SessionIdRow>(
      'INSERT INTO sessions (user_id, refresh_token_hash, ip, user_agent) VALUES ($1, $2, $3, $4) RETURNING id',
      [input.user_id, input.refresh_token_hash, input.ip, input.user_agent],
    );
    return result.rows[0];
  }

  async updateRefreshToken(input: {
    id: string;
    refresh_token_hash: string;
  }): Promise<boolean> {
    const result = await this.db.query(
      'UPDATE sessions SET refresh_token_hash = $1, last_seen_at = now() WHERE id = $2 AND revoked_at IS NULL',
      [input.refresh_token_hash, input.id],
    );
    return (result.rowCount ?? 0) > 0;
  }

  async revoke(id: string): Promise<void> {
    await this.db.query(
      'UPDATE sessions SET revoked_at = now() WHERE id = $1 AND revoked_at IS NULL',
      [id],
    );
  }
}

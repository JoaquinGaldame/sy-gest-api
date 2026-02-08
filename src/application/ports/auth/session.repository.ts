export interface SessionRepository {
  findById(id: string): Promise<{
    id: string;
    user_id: string;
    refresh_token_hash: string;
    revoked_at: string | null;
  } | null>;
  create(input: {
    user_id: string;
    refresh_token_hash: string;
    ip: string | null;
    user_agent: string | null;
  }): Promise<{ id: string }>;
  updateRefreshToken(input: {
    id: string;
    refresh_token_hash: string;
  }): Promise<boolean>;
  revoke(id: string): Promise<void>;
}

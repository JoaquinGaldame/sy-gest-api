export interface Session {
  id: string;
  user_id: string;
  refresh_token_hash: string;
  created_at: string;
  last_seen_at: string;
  revoked_at: string | null;
  ip: string | null;
  user_agent: string | null;
}

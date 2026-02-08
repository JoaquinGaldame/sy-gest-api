export interface User {
  id: string;
  username: string;
  email: string;
  group_id: number | null;
  super_user: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

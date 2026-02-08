export interface UserGroup {
  id: number;
  code: string;
  name: string;
  zone_id: number | null;
  branch_id: number | null;
  active: boolean;
  created_at: string;
}

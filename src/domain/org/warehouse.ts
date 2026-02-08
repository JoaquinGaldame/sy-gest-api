export interface Warehouse {
  id: number;
  branch_id: number;
  code: string;
  name: string;
  description: string | null;
  max_rows: number;
  max_columns: number;
  created_at: string;
}

export type VisibilityScope =
  | { type: 'all' }
  | { type: 'branch'; branch_id: number }
  | { type: 'zone'; zone_id: number };

export interface VisibilityService {
  getWarehouseVisibility(user_id: string): Promise<VisibilityScope>;
}

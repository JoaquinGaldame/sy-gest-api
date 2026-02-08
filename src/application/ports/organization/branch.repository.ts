export type BranchRow = {
  id: number;
  company_id: number;
  zone_id: number;
  code: string;
  name: string;
};

export interface BranchRepository {
  list(): Promise<BranchRow[]>;
  listByZone(zone_id: number): Promise<BranchRow[]>;
  findById(id: number): Promise<BranchRow | null>;
  create(input: {
    company_id: number;
    zone_id: number;
    code: string;
    name: string;
  }): Promise<BranchRow>;
  update(
    id: number,
    input: { company_id: number; zone_id: number; code: string; name: string },
  ): Promise<BranchRow | null>;
  delete(id: number): Promise<boolean>;
}

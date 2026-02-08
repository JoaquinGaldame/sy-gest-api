export type WarehouseRow = {
  id: number;
  branch_id: number;
  code: string;
  name: string;
  description: string | null;
  max_rows: number;
  max_columns: number;
};

export interface WarehouseRepository {
  list(): Promise<WarehouseRow[]>;
  listByBranch(branch_id: number): Promise<WarehouseRow[]>;
  listByZone(zone_id: number): Promise<WarehouseRow[]>;
  findById(id: number): Promise<WarehouseRow | null>;
  create(input: {
    branch_id: number;
    code: string;
    name: string;
    description: string | null;
    max_rows: number;
    max_columns: number;
  }): Promise<WarehouseRow>;
  update(
    id: number,
    input: {
      branch_id: number;
      code: string;
      name: string;
      description: string | null;
      max_rows: number;
      max_columns: number;
    },
  ): Promise<WarehouseRow | null>;
  delete(id: number): Promise<boolean>;
}

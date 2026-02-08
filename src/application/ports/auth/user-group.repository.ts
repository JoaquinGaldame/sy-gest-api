export type UserGroupRow = {
  id: number;
  code: string;
  name: string;
  zone_id: number | null;
  branch_id: number | null;
  active: boolean;
};

export interface UserGroupRepository {
  list(): Promise<UserGroupRow[]>;
  findById(id: number): Promise<UserGroupRow | null>;
  create(input: {
    code: string;
    name: string;
    zone_id: number | null;
    branch_id: number | null;
    active: boolean;
  }): Promise<UserGroupRow>;
  update(
    id: number,
    input: {
      code: string;
      name: string;
      zone_id: number | null;
      branch_id: number | null;
      active: boolean;
    },
  ): Promise<UserGroupRow | null>;
  delete(id: number): Promise<boolean>;
}

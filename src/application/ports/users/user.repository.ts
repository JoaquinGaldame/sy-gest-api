export type UserRow = {
  id: string;
  username: string;
  email: string;
  group_id: number | null;
  super_user: boolean;
  active: boolean;
};

export type UserAuthRow = UserRow & {
  password_hash: string;
};

export interface UserRepository {
  findAuthByEmail(email: string): Promise<UserAuthRow | null>;
  findById(id: string): Promise<UserRow | null>;
  list(): Promise<UserRow[]>;
  create(input: {
    username: string;
    email: string;
    password_hash: string;
    group_id: number | null;
    super_user: boolean;
    active: boolean;
  }): Promise<UserRow>;
  update(
    id: string,
    input: {
      username: string;
      email: string;
      group_id: number | null;
      super_user: boolean;
      active: boolean;
    },
  ): Promise<UserRow | null>;
  softDelete(id: string): Promise<boolean>;
}

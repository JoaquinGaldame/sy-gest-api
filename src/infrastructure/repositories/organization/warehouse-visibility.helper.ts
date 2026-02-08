import { DbClient } from '../../db/db.client';

export type WarehouseVisibilityScope =
  | { type: 'all' }
  | { type: 'branch'; branch_id: number }
  | { type: 'zone'; zone_id: number };

export type UserScopeRow = {
  super_user: boolean;
  group_id: number | null;
  zone_id: number | null;
  branch_id: number | null;
};

export function resolveWarehouseVisibilityScope(
  row: UserScopeRow | null | undefined,
): WarehouseVisibilityScope {
  if (!row) {
    return { type: 'all' };
  }

  if (row.super_user) {
    return { type: 'all' };
  }

  if (row.branch_id) {
    return { type: 'branch', branch_id: row.branch_id };
  }

  if (row.zone_id) {
    return { type: 'zone', zone_id: row.zone_id };
  }

  return { type: 'all' };
}

export async function getWarehouseVisibilityScope(
  db: DbClient,
  user_id: string,
): Promise<WarehouseVisibilityScope> {
  const result = await db.query<UserScopeRow>(
    `SELECT u.super_user, u.group_id, g.zone_id, g.branch_id
     FROM users u
     LEFT JOIN user_group g ON g.id = u.group_id
     WHERE u.id = $1`,
    [user_id],
  );

  return resolveWarehouseVisibilityScope(result.rows[0]);
}

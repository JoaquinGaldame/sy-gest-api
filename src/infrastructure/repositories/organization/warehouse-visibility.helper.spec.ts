import { resolveWarehouseVisibilityScope } from './warehouse-visibility.helper';

describe('warehouse visibility scope', () => {
  it('group.zone_id filtra por zona', () => {
    const scope = resolveWarehouseVisibilityScope({
      super_user: false,
      group_id: 1,
      zone_id: 10,
      branch_id: null,
    });
    expect(scope).toEqual({ type: 'zone', zone_id: 10 });
  });

  it('group.branch_id filtra por branch', () => {
    const scope = resolveWarehouseVisibilityScope({
      super_user: false,
      group_id: 2,
      zone_id: null,
      branch_id: 5,
    });
    expect(scope).toEqual({ type: 'branch', branch_id: 5 });
  });

  it('group sin ids ve todo', () => {
    const scope = resolveWarehouseVisibilityScope({
      super_user: false,
      group_id: 3,
      zone_id: null,
      branch_id: null,
    });
    expect(scope).toEqual({ type: 'all' });
  });

  it('super_user ve todo', () => {
    const scope = resolveWarehouseVisibilityScope({
      super_user: true,
      group_id: null,
      zone_id: null,
      branch_id: null,
    });
    expect(scope).toEqual({ type: 'all' });
  });
});

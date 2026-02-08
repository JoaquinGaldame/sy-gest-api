import {
  ForbiddenError,
  NotFoundError,
} from '../../../../domain/errors/domain-errors';
import { BranchRepository } from '../../../ports/organization/branch.repository';
import { VisibilityService } from '../../../ports/organization/visibility.service';
import { WarehouseRepository } from '../../../ports/organization/warehouse.repository';

export class CreateWarehouseUseCase {
  constructor(
    private readonly warehouses: WarehouseRepository,
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: {
    user_id: string;
    branch_id: number;
    code: string;
    name: string;
    description: string | null;
    max_rows: number;
    max_columns: number;
  }) {
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch' && scope.branch_id !== input.branch_id) {
      throw new ForbiddenError('Branch not visible');
    }
    if (scope.type === 'zone') {
      const branch = await this.branches.findById(input.branch_id);
      if (!branch || branch.zone_id !== scope.zone_id) {
        throw new ForbiddenError('Branch not visible');
      }
    }
    return this.warehouses.create({
      branch_id: input.branch_id,
      code: input.code,
      name: input.name,
      description: input.description,
      max_rows: input.max_rows,
      max_columns: input.max_columns,
    });
  }
}

export class ListWarehousesUseCase {
  constructor(
    private readonly warehouses: WarehouseRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: { user_id: string }) {
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'all') {
      return this.warehouses.list();
    }
    if (scope.type === 'branch') {
      return this.warehouses.listByBranch(scope.branch_id);
    }
    return this.warehouses.listByZone(scope.zone_id);
  }
}

export class GetWarehouseUseCase {
  constructor(
    private readonly warehouses: WarehouseRepository,
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: { user_id: string; id: number }) {
    const warehouse = await this.warehouses.findById(input.id);
    if (!warehouse) {
      throw new NotFoundError('Warehouse not found');
    }
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch' && scope.branch_id !== warehouse.branch_id) {
      throw new ForbiddenError('Warehouse not visible');
    }
    if (scope.type === 'zone') {
      const branch = await this.branches.findById(warehouse.branch_id);
      if (!branch || branch.zone_id !== scope.zone_id) {
        throw new ForbiddenError('Warehouse not visible');
      }
    }
    return warehouse;
  }
}

export class UpdateWarehouseUseCase {
  constructor(
    private readonly warehouses: WarehouseRepository,
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: {
    user_id: string;
    id: number;
    branch_id: number;
    code: string;
    name: string;
    description: string | null;
    max_rows: number;
    max_columns: number;
  }) {
    const existing = await this.warehouses.findById(input.id);
    if (!existing) {
      throw new NotFoundError('Warehouse not found');
    }
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch' && scope.branch_id !== existing.branch_id) {
      throw new ForbiddenError('Warehouse not visible');
    }
    if (scope.type === 'zone') {
      const branch = await this.branches.findById(existing.branch_id);
      if (!branch || branch.zone_id !== scope.zone_id) {
        throw new ForbiddenError('Warehouse not visible');
      }
      const newBranch = await this.branches.findById(input.branch_id);
      if (!newBranch || newBranch.zone_id !== scope.zone_id) {
        throw new ForbiddenError('Warehouse target branch not visible');
      }
    }
    return this.warehouses.update(input.id, {
      branch_id: input.branch_id,
      code: input.code,
      name: input.name,
      description: input.description,
      max_rows: input.max_rows,
      max_columns: input.max_columns,
    });
  }
}

export class DeleteWarehouseUseCase {
  constructor(
    private readonly warehouses: WarehouseRepository,
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: { user_id: string; id: number }) {
    const warehouse = await this.warehouses.findById(input.id);
    if (!warehouse) {
      throw new NotFoundError('Warehouse not found');
    }
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch' && scope.branch_id !== warehouse.branch_id) {
      throw new ForbiddenError('Warehouse not visible');
    }
    if (scope.type === 'zone') {
      const branch = await this.branches.findById(warehouse.branch_id);
      if (!branch || branch.zone_id !== scope.zone_id) {
        throw new ForbiddenError('Warehouse not visible');
      }
    }
    const ok = await this.warehouses.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Warehouse not found');
    }
    return { ok: true };
  }
}

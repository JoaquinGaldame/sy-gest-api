import {
  ForbiddenError,
  NotFoundError,
} from '../../../../domain/errors/domain-errors';
import { BranchRepository } from '../../../ports/organization/branch.repository';
import { VisibilityService } from '../../../ports/organization/visibility.service';

export class CreateBranchUseCase {
  constructor(
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: {
    user_id: string;
    company_id: number;
    zone_id: number;
    code: string;
    name: string;
  }) {
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch') {
      throw new ForbiddenError('Branch scope cannot create branches');
    }
    if (scope.type === 'zone' && scope.zone_id !== input.zone_id) {
      throw new ForbiddenError('Zone scope cannot create branch outside zone');
    }
    return this.branches.create({
      company_id: input.company_id,
      zone_id: input.zone_id,
      code: input.code,
      name: input.name,
    });
  }
}

export class ListBranchesUseCase {
  constructor(
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: { user_id: string }) {
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'all') {
      return this.branches.list();
    }
    if (scope.type === 'branch') {
      const branch = await this.branches.findById(scope.branch_id);
      return branch ? [branch] : [];
    }
    return this.branches.listByZone(scope.zone_id);
  }
}

export class GetBranchUseCase {
  constructor(
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: { user_id: string; id: number }) {
    const branch = await this.branches.findById(input.id);
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch' && scope.branch_id !== branch.id) {
      throw new ForbiddenError('Branch not visible');
    }
    if (scope.type === 'zone' && scope.zone_id !== branch.zone_id) {
      throw new ForbiddenError('Branch not visible');
    }
    return branch;
  }
}

export class UpdateBranchUseCase {
  constructor(
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: {
    user_id: string;
    id: number;
    company_id: number;
    zone_id: number;
    code: string;
    name: string;
  }) {
    const existing = await this.branches.findById(input.id);
    if (!existing) {
      throw new NotFoundError('Branch not found');
    }
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch' && scope.branch_id !== existing.id) {
      throw new ForbiddenError('Branch not visible');
    }
    if (scope.type === 'zone' && scope.zone_id !== existing.zone_id) {
      throw new ForbiddenError('Branch not visible');
    }
    if (scope.type === 'zone' && scope.zone_id !== input.zone_id) {
      throw new ForbiddenError('Zone scope cannot move branch to other zone');
    }
    return this.branches.update(input.id, {
      company_id: input.company_id,
      zone_id: input.zone_id,
      code: input.code,
      name: input.name,
    });
  }
}

export class DeleteBranchUseCase {
  constructor(
    private readonly branches: BranchRepository,
    private readonly visibility: VisibilityService,
  ) {}

  async execute(input: { user_id: string; id: number }) {
    const branch = await this.branches.findById(input.id);
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }
    const scope = await this.visibility.getWarehouseVisibility(input.user_id);
    if (scope.type === 'branch' && scope.branch_id !== branch.id) {
      throw new ForbiddenError('Branch not visible');
    }
    if (scope.type === 'zone' && scope.zone_id !== branch.zone_id) {
      throw new ForbiddenError('Branch not visible');
    }
    const ok = await this.branches.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Branch not found');
    }
    return { ok: true };
  }
}

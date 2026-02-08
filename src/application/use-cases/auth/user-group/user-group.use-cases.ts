import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { UserGroupRepository } from '../../../ports/auth/user-group.repository';

export class CreateUserGroupUseCase {
  constructor(private readonly groups: UserGroupRepository) {}

  execute(input: Parameters<UserGroupRepository['create']>[0]) {
    return this.groups.create(input);
  }
}

export class ListUserGroupsUseCase {
  constructor(private readonly groups: UserGroupRepository) {}

  execute() {
    return this.groups.list();
  }
}

export class GetUserGroupUseCase {
  constructor(private readonly groups: UserGroupRepository) {}

  async execute(input: { id: number }) {
    const group = await this.groups.findById(input.id);
    if (!group) {
      throw new NotFoundError('User group not found');
    }
    return group;
  }
}

export class UpdateUserGroupUseCase {
  constructor(private readonly groups: UserGroupRepository) {}

  async execute(
    input: { id: number } & Parameters<UserGroupRepository['update']>[1],
  ) {
    const group = await this.groups.update(input.id, input);
    if (!group) {
      throw new NotFoundError('User group not found');
    }
    return group;
  }
}

export class DeleteUserGroupUseCase {
  constructor(private readonly groups: UserGroupRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.groups.delete(input.id);
    if (!ok) {
      throw new NotFoundError('User group not found');
    }
    return { ok: true };
  }
}

import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from '../../../../domain/errors/domain-errors';
import { PasswordHasher } from '../../../ports/auth/password.hasher';
import { UserRepository } from '../../../ports/users/user.repository';

export class CreateUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(input: {
    username: string;
    email: string;
    password: string;
    group_id: number | null;
    super_user: boolean;
    active: boolean;
  }) {
    if (input.super_user && input.group_id !== null) {
      throw new ValidationError('Super user cannot have group_id');
    }
    if (!input.super_user && input.group_id === null) {
      throw new ValidationError('group_id is required for non super user');
    }

    const existing = await this.users.findAuthByEmail(input.email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    const passwordHash = await this.hasher.hash(input.password);
    return this.users.create({
      username: input.username,
      email: input.email,
      password_hash: passwordHash,
      group_id: input.group_id,
      super_user: input.super_user,
      active: input.active,
    });
  }
}

export class ListUsersUseCase {
  constructor(private readonly users: UserRepository) {}

  execute() {
    return this.users.list();
  }
}

export class GetUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(input: { id: string }) {
    const user = await this.users.findById(input.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}

export class UpdateUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(input: {
    id: string;
    username: string;
    email: string;
    group_id: number | null;
    super_user: boolean;
    active: boolean;
  }) {
    if (input.super_user && input.group_id !== null) {
      throw new ValidationError('Super user cannot have group_id');
    }
    if (!input.super_user && input.group_id === null) {
      throw new ValidationError('group_id is required for non super user');
    }

    const user = await this.users.update(input.id, {
      username: input.username,
      email: input.email,
      group_id: input.group_id,
      super_user: input.super_user,
      active: input.active,
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}

export class SoftDeleteUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(input: { id: string }) {
    const ok = await this.users.softDelete(input.id);
    if (!ok) {
      throw new NotFoundError('User not found');
    }
    return { ok: true };
  }
}

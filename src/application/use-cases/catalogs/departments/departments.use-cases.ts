import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { DepartmentRepository } from '../../../ports/catalogs/departments.repository';

export class CreateDepartmentUseCase {
  constructor(private readonly departments: DepartmentRepository) {}

  execute(input: Parameters<DepartmentRepository['create']>[0]) {
    return this.departments.create(input);
  }
}

export class ListDepartmentsUseCase {
  constructor(private readonly departments: DepartmentRepository) {}

  execute() {
    return this.departments.list();
  }
}

export class GetDepartmentUseCase {
  constructor(private readonly departments: DepartmentRepository) {}

  async execute(input: { id: number }) {
    const department = await this.departments.findById(input.id);
    if (!department) {
      throw new NotFoundError('Department not found');
    }
    return department;
  }
}

export class UpdateDepartmentUseCase {
  constructor(private readonly departments: DepartmentRepository) {}

  async execute(
    input: { id: number } & Parameters<DepartmentRepository['update']>[1],
  ) {
    const department = await this.departments.update(input.id, input);
    if (!department) {
      throw new NotFoundError('Department not found');
    }
    return department;
  }
}

export class DeleteDepartmentUseCase {
  constructor(private readonly departments: DepartmentRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.departments.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Department not found');
    }
    return { ok: true };
  }
}

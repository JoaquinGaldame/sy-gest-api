import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { CompanyRepository } from '../../../ports/organization/company.repository';

export class CreateCompanyUseCase {
  constructor(private readonly companies: CompanyRepository) {}

  execute(input: Parameters<CompanyRepository['create']>[0]) {
    return this.companies.create(input);
  }
}

export class ListCompaniesUseCase {
  constructor(private readonly companies: CompanyRepository) {}

  execute() {
    return this.companies.list();
  }
}

export class GetCompanyUseCase {
  constructor(private readonly companies: CompanyRepository) {}

  async execute(input: { id: number }) {
    const company = await this.companies.findById(input.id);
    if (!company) {
      throw new NotFoundError('Company not found');
    }
    return company;
  }
}

export class UpdateCompanyUseCase {
  constructor(private readonly companies: CompanyRepository) {}

  async execute(
    input: { id: number } & Parameters<CompanyRepository['update']>[1],
  ) {
    const company = await this.companies.update(input.id, input);
    if (!company) {
      throw new NotFoundError('Company not found');
    }
    return company;
  }
}

export class DeleteCompanyUseCase {
  constructor(private readonly companies: CompanyRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.companies.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Company not found');
    }
    return { ok: true };
  }
}

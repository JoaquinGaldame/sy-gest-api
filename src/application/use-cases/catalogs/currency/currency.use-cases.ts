import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { CurrencyRepository } from '../../../ports/catalogs/currency.repository';

export class CreateCurrencyUseCase {
  constructor(private readonly currencies: CurrencyRepository) {}

  execute(input: Parameters<CurrencyRepository['create']>[0]) {
    return this.currencies.create(input);
  }
}

export class ListCurrenciesUseCase {
  constructor(private readonly currencies: CurrencyRepository) {}

  execute() {
    return this.currencies.list();
  }
}

export class GetCurrencyUseCase {
  constructor(private readonly currencies: CurrencyRepository) {}

  async execute(input: { id: number }) {
    const currency = await this.currencies.findById(input.id);
    if (!currency) {
      throw new NotFoundError('Currency not found');
    }
    return currency;
  }
}

export class UpdateCurrencyUseCase {
  constructor(private readonly currencies: CurrencyRepository) {}

  async execute(
    input: { id: number } & Parameters<CurrencyRepository['update']>[1],
  ) {
    const currency = await this.currencies.update(input.id, input);
    if (!currency) {
      throw new NotFoundError('Currency not found');
    }
    return currency;
  }
}

export class DeleteCurrencyUseCase {
  constructor(private readonly currencies: CurrencyRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.currencies.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Currency not found');
    }
    return { ok: true };
  }
}

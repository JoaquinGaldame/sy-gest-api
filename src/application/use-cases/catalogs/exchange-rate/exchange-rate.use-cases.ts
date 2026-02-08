import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { ExchangeRateRepository } from '../../../ports/catalogs/exchange-rate.repository';

export class CreateExchangeRateUseCase {
  constructor(private readonly rates: ExchangeRateRepository) {}

  execute(input: Parameters<ExchangeRateRepository['create']>[0]) {
    return this.rates.create(input);
  }
}

export class ListExchangeRatesUseCase {
  constructor(private readonly rates: ExchangeRateRepository) {}

  execute() {
    return this.rates.list();
  }
}

export class GetExchangeRateUseCase {
  constructor(private readonly rates: ExchangeRateRepository) {}

  async execute(input: { id: number }) {
    const rate = await this.rates.findById(input.id);
    if (!rate) {
      throw new NotFoundError('Exchange rate not found');
    }
    return rate;
  }
}

export class UpdateExchangeRateUseCase {
  constructor(private readonly rates: ExchangeRateRepository) {}

  async execute(
    input: { id: number } & Parameters<ExchangeRateRepository['update']>[1],
  ) {
    const rate = await this.rates.update(input.id, input);
    if (!rate) {
      throw new NotFoundError('Exchange rate not found');
    }
    return rate;
  }
}

export class DeleteExchangeRateUseCase {
  constructor(private readonly rates: ExchangeRateRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.rates.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Exchange rate not found');
    }
    return { ok: true };
  }
}

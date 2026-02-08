import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { CountryRepository } from '../../../ports/catalogs/country.repository';

export class CreateCountryUseCase {
  constructor(private readonly countries: CountryRepository) {}

  execute(input: Parameters<CountryRepository['create']>[0]) {
    return this.countries.create(input);
  }
}

export class ListCountriesUseCase {
  constructor(private readonly countries: CountryRepository) {}

  execute() {
    return this.countries.list();
  }
}

export class GetCountryUseCase {
  constructor(private readonly countries: CountryRepository) {}

  async execute(input: { id: number }) {
    const country = await this.countries.findById(input.id);
    if (!country) {
      throw new NotFoundError('Country not found');
    }
    return country;
  }
}

export class UpdateCountryUseCase {
  constructor(private readonly countries: CountryRepository) {}

  async execute(
    input: { id: number } & Parameters<CountryRepository['update']>[1],
  ) {
    const country = await this.countries.update(input.id, input);
    if (!country) {
      throw new NotFoundError('Country not found');
    }
    return country;
  }
}

export class DeleteCountryUseCase {
  constructor(private readonly countries: CountryRepository) {}

  async execute(input: { id: number }) {
    const ok = await this.countries.delete(input.id);
    if (!ok) {
      throw new NotFoundError('Country not found');
    }
    return { ok: true };
  }
}

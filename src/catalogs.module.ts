import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './infrastructure/db/db.module';
import { DbClient } from './infrastructure/db/db.client';
import { AuthModule } from './auth.module';
import { CountryController } from './interfaces/http/catalogs/controllers/country.controller';
import { CurrencyController } from './interfaces/http/catalogs/controllers/currency.controller';
import { ExchangeRateController } from './interfaces/http/catalogs/controllers/exchange-rate.controller';
import { DepartmentController } from './interfaces/http/catalogs/controllers/departments.controller';
import { JobTitleController } from './interfaces/http/catalogs/controllers/job-titles.controller';
import { CountryRepositoryPg } from './infrastructure/repositories/catalogs/country.repository.pg';
import { CurrencyRepositoryPg } from './infrastructure/repositories/catalogs/currency.repository.pg';
import { ExchangeRateRepositoryPg } from './infrastructure/repositories/catalogs/exchange-rate.repository.pg';
import { DepartmentRepositoryPg } from './infrastructure/repositories/catalogs/departments.repository.pg';
import { JobTitleRepositoryPg } from './infrastructure/repositories/catalogs/job-titles.repository.pg';
import {
  COUNTRY_REPO,
  CURRENCY_REPO,
  EXCHANGE_RATE_REPO,
  DEPARTMENT_REPO,
  JOB_TITLE_REPO,
} from './application/ports/tokens';
import {
  CreateCountryUseCase,
  DeleteCountryUseCase,
  GetCountryUseCase,
  ListCountriesUseCase,
  UpdateCountryUseCase,
} from './application/use-cases/catalogs/country/country.use-cases';
import {
  CreateCurrencyUseCase,
  DeleteCurrencyUseCase,
  GetCurrencyUseCase,
  ListCurrenciesUseCase,
  UpdateCurrencyUseCase,
} from './application/use-cases/catalogs/currency/currency.use-cases';
import {
  CreateExchangeRateUseCase,
  DeleteExchangeRateUseCase,
  GetExchangeRateUseCase,
  ListExchangeRatesUseCase,
  UpdateExchangeRateUseCase,
} from './application/use-cases/catalogs/exchange-rate/exchange-rate.use-cases';
import {
  CreateDepartmentUseCase,
  DeleteDepartmentUseCase,
  GetDepartmentUseCase,
  ListDepartmentsUseCase,
  UpdateDepartmentUseCase,
} from './application/use-cases/catalogs/departments/departments.use-cases';
import {
  CreateJobTitleUseCase,
  DeleteJobTitleUseCase,
  GetJobTitleUseCase,
  ListJobTitlesUseCase,
  UpdateJobTitleUseCase,
} from './application/use-cases/catalogs/job-titles/job-titles.use-cases';
import { CountryRepository } from './application/ports/catalogs/country.repository';
import { CurrencyRepository } from './application/ports/catalogs/currency.repository';
import { ExchangeRateRepository } from './application/ports/catalogs/exchange-rate.repository';
import { DepartmentRepository } from './application/ports/catalogs/departments.repository';
import { JobTitleRepository } from './application/ports/catalogs/job-titles.repository';

@Module({
  imports: [ConfigModule, DbModule, AuthModule],
  controllers: [
    CountryController,
    CurrencyController,
    ExchangeRateController,
    DepartmentController,
    JobTitleController,
  ],
  providers: [
    {
      provide: COUNTRY_REPO,
      useFactory: (db: DbClient) => new CountryRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: CURRENCY_REPO,
      useFactory: (db: DbClient) => new CurrencyRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: EXCHANGE_RATE_REPO,
      useFactory: (db: DbClient) => new ExchangeRateRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: DEPARTMENT_REPO,
      useFactory: (db: DbClient) => new DepartmentRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: JOB_TITLE_REPO,
      useFactory: (db: DbClient) => new JobTitleRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: CreateCountryUseCase,
      useFactory: (countries: CountryRepository) =>
        new CreateCountryUseCase(countries),
      inject: [COUNTRY_REPO],
    },
    {
      provide: ListCountriesUseCase,
      useFactory: (countries: CountryRepository) =>
        new ListCountriesUseCase(countries),
      inject: [COUNTRY_REPO],
    },
    {
      provide: GetCountryUseCase,
      useFactory: (countries: CountryRepository) =>
        new GetCountryUseCase(countries),
      inject: [COUNTRY_REPO],
    },
    {
      provide: UpdateCountryUseCase,
      useFactory: (countries: CountryRepository) =>
        new UpdateCountryUseCase(countries),
      inject: [COUNTRY_REPO],
    },
    {
      provide: DeleteCountryUseCase,
      useFactory: (countries: CountryRepository) =>
        new DeleteCountryUseCase(countries),
      inject: [COUNTRY_REPO],
    },
    {
      provide: CreateCurrencyUseCase,
      useFactory: (currencies: CurrencyRepository) =>
        new CreateCurrencyUseCase(currencies),
      inject: [CURRENCY_REPO],
    },
    {
      provide: ListCurrenciesUseCase,
      useFactory: (currencies: CurrencyRepository) =>
        new ListCurrenciesUseCase(currencies),
      inject: [CURRENCY_REPO],
    },
    {
      provide: GetCurrencyUseCase,
      useFactory: (currencies: CurrencyRepository) =>
        new GetCurrencyUseCase(currencies),
      inject: [CURRENCY_REPO],
    },
    {
      provide: UpdateCurrencyUseCase,
      useFactory: (currencies: CurrencyRepository) =>
        new UpdateCurrencyUseCase(currencies),
      inject: [CURRENCY_REPO],
    },
    {
      provide: DeleteCurrencyUseCase,
      useFactory: (currencies: CurrencyRepository) =>
        new DeleteCurrencyUseCase(currencies),
      inject: [CURRENCY_REPO],
    },
    {
      provide: CreateExchangeRateUseCase,
      useFactory: (rates: ExchangeRateRepository) =>
        new CreateExchangeRateUseCase(rates),
      inject: [EXCHANGE_RATE_REPO],
    },
    {
      provide: ListExchangeRatesUseCase,
      useFactory: (rates: ExchangeRateRepository) =>
        new ListExchangeRatesUseCase(rates),
      inject: [EXCHANGE_RATE_REPO],
    },
    {
      provide: GetExchangeRateUseCase,
      useFactory: (rates: ExchangeRateRepository) =>
        new GetExchangeRateUseCase(rates),
      inject: [EXCHANGE_RATE_REPO],
    },
    {
      provide: UpdateExchangeRateUseCase,
      useFactory: (rates: ExchangeRateRepository) =>
        new UpdateExchangeRateUseCase(rates),
      inject: [EXCHANGE_RATE_REPO],
    },
    {
      provide: DeleteExchangeRateUseCase,
      useFactory: (rates: ExchangeRateRepository) =>
        new DeleteExchangeRateUseCase(rates),
      inject: [EXCHANGE_RATE_REPO],
    },
    {
      provide: CreateDepartmentUseCase,
      useFactory: (departments: DepartmentRepository) =>
        new CreateDepartmentUseCase(departments),
      inject: [DEPARTMENT_REPO],
    },
    {
      provide: ListDepartmentsUseCase,
      useFactory: (departments: DepartmentRepository) =>
        new ListDepartmentsUseCase(departments),
      inject: [DEPARTMENT_REPO],
    },
    {
      provide: GetDepartmentUseCase,
      useFactory: (departments: DepartmentRepository) =>
        new GetDepartmentUseCase(departments),
      inject: [DEPARTMENT_REPO],
    },
    {
      provide: UpdateDepartmentUseCase,
      useFactory: (departments: DepartmentRepository) =>
        new UpdateDepartmentUseCase(departments),
      inject: [DEPARTMENT_REPO],
    },
    {
      provide: DeleteDepartmentUseCase,
      useFactory: (departments: DepartmentRepository) =>
        new DeleteDepartmentUseCase(departments),
      inject: [DEPARTMENT_REPO],
    },
    {
      provide: CreateJobTitleUseCase,
      useFactory: (jobs: JobTitleRepository) => new CreateJobTitleUseCase(jobs),
      inject: [JOB_TITLE_REPO],
    },
    {
      provide: ListJobTitlesUseCase,
      useFactory: (jobs: JobTitleRepository) => new ListJobTitlesUseCase(jobs),
      inject: [JOB_TITLE_REPO],
    },
    {
      provide: GetJobTitleUseCase,
      useFactory: (jobs: JobTitleRepository) => new GetJobTitleUseCase(jobs),
      inject: [JOB_TITLE_REPO],
    },
    {
      provide: UpdateJobTitleUseCase,
      useFactory: (jobs: JobTitleRepository) => new UpdateJobTitleUseCase(jobs),
      inject: [JOB_TITLE_REPO],
    },
    {
      provide: DeleteJobTitleUseCase,
      useFactory: (jobs: JobTitleRepository) => new DeleteJobTitleUseCase(jobs),
      inject: [JOB_TITLE_REPO],
    },
  ],
})
export class CatalogsModule {}

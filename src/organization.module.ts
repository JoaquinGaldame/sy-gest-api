import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './infrastructure/db/db.module';
import { DbClient } from './infrastructure/db/db.client';
import { AuthModule } from './auth.module';
import { ZoneController } from './interfaces/http/organization/controllers/zone.controller';
import { BranchController } from './interfaces/http/organization/controllers/branch.controller';
import { WarehouseController } from './interfaces/http/organization/controllers/warehouse.controller';
import { CompanyController } from './interfaces/http/organization/controllers/company.controller';
import { ZoneRepositoryPg } from './infrastructure/repositories/organization/zone.repository.pg';
import { BranchRepositoryPg } from './infrastructure/repositories/organization/branch.repository.pg';
import { WarehouseRepositoryPg } from './infrastructure/repositories/organization/warehouse.repository.pg';
import { CompanyRepositoryPg } from './infrastructure/repositories/organization/company.repository.pg';
import { VisibilityServicePg } from './infrastructure/repositories/organization/visibility.service.pg';
import {
  BRANCH_REPO,
  COMPANY_REPO,
  VISIBILITY_SERVICE,
  WAREHOUSE_REPO,
  ZONE_REPO,
} from './application/ports/tokens';
import {
  CreateZoneUseCase,
  DeleteZoneUseCase,
  GetZoneUseCase,
  ListZonesUseCase,
  UpdateZoneUseCase,
} from './application/use-cases/organization/zone/zone.use-cases';
import {
  CreateBranchUseCase,
  DeleteBranchUseCase,
  GetBranchUseCase,
  ListBranchesUseCase,
  UpdateBranchUseCase,
} from './application/use-cases/organization/branch/branch.use-cases';
import {
  CreateWarehouseUseCase,
  DeleteWarehouseUseCase,
  GetWarehouseUseCase,
  ListWarehousesUseCase,
  UpdateWarehouseUseCase,
} from './application/use-cases/organization/warehouse/warehouse.use-cases';
import {
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  GetCompanyUseCase,
  ListCompaniesUseCase,
  UpdateCompanyUseCase,
} from './application/use-cases/organization/company/company.use-cases';
import { ZoneRepository } from './application/ports/organization/zone.repository';
import { BranchRepository } from './application/ports/organization/branch.repository';
import { WarehouseRepository } from './application/ports/organization/warehouse.repository';
import { CompanyRepository } from './application/ports/organization/company.repository';
import { VisibilityService } from './application/ports/organization/visibility.service';

@Module({
  imports: [ConfigModule, DbModule, AuthModule],
  controllers: [
    ZoneController,
    BranchController,
    WarehouseController,
    CompanyController,
  ],
  providers: [
    {
      provide: ZONE_REPO,
      useFactory: (db: DbClient) => new ZoneRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: BRANCH_REPO,
      useFactory: (db: DbClient) => new BranchRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: WAREHOUSE_REPO,
      useFactory: (db: DbClient) => new WarehouseRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: COMPANY_REPO,
      useFactory: (db: DbClient) => new CompanyRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: VISIBILITY_SERVICE,
      useFactory: (db: DbClient) => new VisibilityServicePg(db),
      inject: [DbClient],
    },
    {
      provide: CreateZoneUseCase,
      useFactory: (zones: ZoneRepository) => new CreateZoneUseCase(zones),
      inject: [ZONE_REPO],
    },
    {
      provide: ListZonesUseCase,
      useFactory: (zones: ZoneRepository) => new ListZonesUseCase(zones),
      inject: [ZONE_REPO],
    },
    {
      provide: GetZoneUseCase,
      useFactory: (zones: ZoneRepository) => new GetZoneUseCase(zones),
      inject: [ZONE_REPO],
    },
    {
      provide: UpdateZoneUseCase,
      useFactory: (zones: ZoneRepository) => new UpdateZoneUseCase(zones),
      inject: [ZONE_REPO],
    },
    {
      provide: DeleteZoneUseCase,
      useFactory: (zones: ZoneRepository) => new DeleteZoneUseCase(zones),
      inject: [ZONE_REPO],
    },
    {
      provide: CreateBranchUseCase,
      useFactory: (branches: BranchRepository, visibility: VisibilityService) =>
        new CreateBranchUseCase(branches, visibility),
      inject: [BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: ListBranchesUseCase,
      useFactory: (branches: BranchRepository, visibility: VisibilityService) =>
        new ListBranchesUseCase(branches, visibility),
      inject: [BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: GetBranchUseCase,
      useFactory: (branches: BranchRepository, visibility: VisibilityService) =>
        new GetBranchUseCase(branches, visibility),
      inject: [BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: UpdateBranchUseCase,
      useFactory: (branches: BranchRepository, visibility: VisibilityService) =>
        new UpdateBranchUseCase(branches, visibility),
      inject: [BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: DeleteBranchUseCase,
      useFactory: (branches: BranchRepository, visibility: VisibilityService) =>
        new DeleteBranchUseCase(branches, visibility),
      inject: [BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: CreateWarehouseUseCase,
      useFactory: (
        warehouses: WarehouseRepository,
        branches: BranchRepository,
        visibility: VisibilityService,
      ) => new CreateWarehouseUseCase(warehouses, branches, visibility),
      inject: [WAREHOUSE_REPO, BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: ListWarehousesUseCase,
      useFactory: (
        warehouses: WarehouseRepository,
        visibility: VisibilityService,
      ) => new ListWarehousesUseCase(warehouses, visibility),
      inject: [WAREHOUSE_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: GetWarehouseUseCase,
      useFactory: (
        warehouses: WarehouseRepository,
        branches: BranchRepository,
        visibility: VisibilityService,
      ) => new GetWarehouseUseCase(warehouses, branches, visibility),
      inject: [WAREHOUSE_REPO, BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: UpdateWarehouseUseCase,
      useFactory: (
        warehouses: WarehouseRepository,
        branches: BranchRepository,
        visibility: VisibilityService,
      ) => new UpdateWarehouseUseCase(warehouses, branches, visibility),
      inject: [WAREHOUSE_REPO, BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: DeleteWarehouseUseCase,
      useFactory: (
        warehouses: WarehouseRepository,
        branches: BranchRepository,
        visibility: VisibilityService,
      ) => new DeleteWarehouseUseCase(warehouses, branches, visibility),
      inject: [WAREHOUSE_REPO, BRANCH_REPO, VISIBILITY_SERVICE],
    },
    {
      provide: CreateCompanyUseCase,
      useFactory: (companies: CompanyRepository) =>
        new CreateCompanyUseCase(companies),
      inject: [COMPANY_REPO],
    },
    {
      provide: ListCompaniesUseCase,
      useFactory: (companies: CompanyRepository) =>
        new ListCompaniesUseCase(companies),
      inject: [COMPANY_REPO],
    },
    {
      provide: GetCompanyUseCase,
      useFactory: (companies: CompanyRepository) =>
        new GetCompanyUseCase(companies),
      inject: [COMPANY_REPO],
    },
    {
      provide: UpdateCompanyUseCase,
      useFactory: (companies: CompanyRepository) =>
        new UpdateCompanyUseCase(companies),
      inject: [COMPANY_REPO],
    },
    {
      provide: DeleteCompanyUseCase,
      useFactory: (companies: CompanyRepository) =>
        new DeleteCompanyUseCase(companies),
      inject: [COMPANY_REPO],
    },
  ],
})
export class OrganizationModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dtos';
import {
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  GetCompanyUseCase,
  ListCompaniesUseCase,
  UpdateCompanyUseCase,
} from '../../../../application/use-cases/organization/company/company.use-cases';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(
    private readonly createCompany: CreateCompanyUseCase,
    private readonly listCompanies: ListCompaniesUseCase,
    private readonly getCompany: GetCompanyUseCase,
    private readonly updateCompany: UpdateCompanyUseCase,
    private readonly deleteCompany: DeleteCompanyUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.createCompany.execute({
      name: dto.name,
      legal_name: dto.legal_name ?? null,
      tax_id: dto.tax_id ?? null,
      tax_type: dto.tax_type ?? null,
      website: dto.website ?? null,
      logo: dto.logo ?? null,
      phone: dto.phone ?? null,
      email: dto.email ?? null,
      address: dto.address ?? null,
      city: dto.city ?? null,
      country_id: dto.country_id ?? null,
      default_timezone:
        dto.default_timezone ?? 'America/Argentina/Buenos_Aires',
      default_language: dto.default_language ?? 'es',
      default_currency: dto.default_currency ?? 'ARS',
    });
  }

  @Get()
  list() {
    return this.listCompanies.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getCompany.execute({ id });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCompanyDto) {
    return this.updateCompany.execute({
      id,
      name: dto.name,
      legal_name: dto.legal_name ?? null,
      tax_id: dto.tax_id ?? null,
      tax_type: dto.tax_type ?? null,
      website: dto.website ?? null,
      logo: dto.logo ?? null,
      phone: dto.phone ?? null,
      email: dto.email ?? null,
      address: dto.address ?? null,
      city: dto.city ?? null,
      country_id: dto.country_id ?? null,
      default_timezone:
        dto.default_timezone ?? 'America/Argentina/Buenos_Aires',
      default_language: dto.default_language ?? 'es',
      default_currency: dto.default_currency ?? 'ARS',
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCompany.execute({ id });
  }
}

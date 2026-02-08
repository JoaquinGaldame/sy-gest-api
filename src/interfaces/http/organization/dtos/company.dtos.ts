import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  legal_name?: string;

  @IsOptional()
  @IsString()
  tax_id?: string;

  @IsOptional()
  @IsString()
  tax_type?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsInt()
  country_id?: number;

  @IsOptional()
  @IsString()
  default_timezone?: string;

  @IsOptional()
  @IsString()
  default_language?: string;

  @IsOptional()
  @IsString()
  default_currency?: string;
}

export class UpdateCompanyDto extends CreateCompanyDto {}

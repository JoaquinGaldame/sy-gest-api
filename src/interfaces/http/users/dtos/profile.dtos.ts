import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  user_id!: string;

  @IsString()
  first_name!: string;

  @IsString()
  last_name!: string;

  @IsOptional()
  @IsString()
  document_type?: string;

  @IsOptional()
  @IsString()
  document_number?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  email_alternative?: string;

  @IsOptional()
  @IsInt()
  country_id?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsInt()
  department_id?: number;

  @IsOptional()
  @IsInt()
  job_title_id?: number;

  @IsOptional()
  @IsBoolean()
  prefers_dark_mode?: boolean;
}

export class UpdateProfileDto extends CreateProfileDto {}

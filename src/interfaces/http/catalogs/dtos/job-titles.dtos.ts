import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateJobTitleDto {
  @IsString()
  code!: string;

  @IsString()
  name_es!: string;

  @IsString()
  name_en!: string;

  @IsOptional()
  @IsInt()
  department_id?: number;

  @IsBoolean()
  active!: boolean;
}

export class UpdateJobTitleDto extends CreateJobTitleDto {}

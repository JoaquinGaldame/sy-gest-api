import { IsBoolean, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  code!: string;

  @IsString()
  name_es!: string;

  @IsString()
  name_en!: string;

  @IsBoolean()
  active!: boolean;
}

export class UpdateDepartmentDto extends CreateDepartmentDto {}

import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateWarehouseDto {
  @IsInt()
  branch_id!: number;

  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  max_rows!: number;

  @IsInt()
  @Min(1)
  max_columns!: number;
}

export class UpdateWarehouseDto {
  @IsInt()
  branch_id!: number;

  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  max_rows!: number;

  @IsInt()
  @Min(1)
  max_columns!: number;
}

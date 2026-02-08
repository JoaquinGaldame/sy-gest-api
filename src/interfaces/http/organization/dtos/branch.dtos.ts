import { IsInt, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsInt()
  company_id!: number;

  @IsInt()
  zone_id!: number;

  @IsString()
  code!: string;

  @IsString()
  name!: string;
}

export class UpdateBranchDto {
  @IsInt()
  company_id!: number;

  @IsInt()
  zone_id!: number;

  @IsString()
  code!: string;

  @IsString()
  name!: string;
}

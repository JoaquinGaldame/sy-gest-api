import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserGroupDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsInt()
  zone_id?: number;

  @IsOptional()
  @IsInt()
  branch_id?: number;

  @IsBoolean()
  active!: boolean;
}

export class UpdateUserGroupDto extends CreateUserGroupDto {}

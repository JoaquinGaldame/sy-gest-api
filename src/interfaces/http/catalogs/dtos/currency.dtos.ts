import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  code!: string;

  @IsString()
  name_en!: string;

  @IsString()
  name_es!: string;

  @IsOptional()
  @IsString()
  symbol?: string;

  @IsInt()
  minor_unit!: number;

  @IsBoolean()
  active!: boolean;
}

export class UpdateCurrencyDto extends CreateCurrencyDto {}

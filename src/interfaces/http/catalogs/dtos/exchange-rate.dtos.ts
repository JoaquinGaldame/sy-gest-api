import { IsInt, IsNumberString, IsString } from 'class-validator';

export class CreateExchangeRateDto {
  @IsInt()
  base_currency_id!: number;

  @IsInt()
  quote_currency_id!: number;

  @IsNumberString()
  rate!: string;

  @IsString()
  source!: string;

  @IsString()
  effective_at!: string;
}

export class UpdateExchangeRateDto extends CreateExchangeRateDto {}

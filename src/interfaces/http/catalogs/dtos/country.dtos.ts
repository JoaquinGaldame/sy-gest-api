import { IsBoolean, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  iso2!: string;

  @IsString()
  iso3!: string;

  @IsString()
  name_es!: string;

  @IsString()
  name_en!: string;

  @IsString()
  phone_code!: string;

  @IsString()
  currency_code!: string;

  @IsString()
  timezone!: string;

  @IsBoolean()
  active!: boolean;
}

export class UpdateCountryDto extends CreateCountryDto {}

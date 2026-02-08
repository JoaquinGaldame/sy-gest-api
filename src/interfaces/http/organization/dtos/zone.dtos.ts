import { IsString } from 'class-validator';

export class CreateZoneDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;
}

export class UpdateZoneDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;
}

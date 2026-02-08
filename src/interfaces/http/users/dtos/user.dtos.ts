import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsInt()
  group_id?: number;

  @IsBoolean()
  super_user!: boolean;

  @IsBoolean()
  active!: boolean;
}

export class UpdateUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsInt()
  group_id?: number;

  @IsBoolean()
  super_user!: boolean;

  @IsBoolean()
  active!: boolean;
}

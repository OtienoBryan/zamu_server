import { IsString, IsNotEmpty, IsEmail, IsOptional, IsInt, Min, Max, IsEnum, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateKeyAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsOptional()
  @ValidateIf((o) => o.account_number !== undefined && o.account_number !== null && o.account_number !== '')
  @IsString()
  account_number?: string;

  @IsOptional()
  @IsEnum(['client', 'key_account'])
  type?: 'client' | 'key_account';

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  is_active?: number;
}


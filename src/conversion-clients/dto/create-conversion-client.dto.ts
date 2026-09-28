import { IsString, IsNotEmpty, IsEmail, IsOptional, IsInt, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConversionClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsEnum(['individual', 'company'])
  category?: 'individual' | 'company';

  @IsOptional()
  @IsEnum(['individual', 'sacco', 'company'])
  organization_type?: 'individual' | 'sacco' | 'company';

  @IsOptional()
  @IsString()
  organization_name?: string;

  @IsOptional()
  @IsString()
  tax_pin?: string;

  @IsOptional()
  @IsString()
  referral_source?: string;

  @IsOptional()
  @IsString()
  referral_notes?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  tax_exempt?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  apply_discount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discount_rate?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  labour_rate_override?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  labour_rate?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  parts_markup_override?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  parts_markup?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  payment_terms_override?: number;

  @IsOptional()
  @IsString()
  payment_terms?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  is_active?: number;
}

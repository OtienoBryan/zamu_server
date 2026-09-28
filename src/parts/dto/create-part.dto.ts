import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  part_number: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  unit_price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  unit_price_usd?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stock_quantity?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  min_stock_level?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  purchase_cost?: number;

  @IsNumber()
  @Type(() => Number)
  selling_price: number;

  @IsNumber()
  @Type(() => Number)
  selling_price_usd: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}


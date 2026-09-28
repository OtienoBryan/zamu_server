import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSparePartDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateIf((o) => o.categoryId !== null)
  @IsNumber()
  @Type(() => Number)
  categoryId?: number | null;

  @IsOptional()
  @IsString()
  partNumber?: string;

  @IsString()
  @IsNotEmpty()
  unitOfMeasure: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  alertQuantity?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cost?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

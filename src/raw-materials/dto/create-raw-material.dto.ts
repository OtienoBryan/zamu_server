import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRawMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateIf((o) => o.categoryId !== null)
  @IsNumber()
  @Type(() => Number)
  categoryId?: number | null;

  @IsString()
  @IsNotEmpty()
  unitOfMeasure: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  alertQuantity?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  cost: number;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

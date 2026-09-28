import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFinishedProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  imagePublicId?: string;

  @IsNumber()
  @Type(() => Number)
  sellingPrice: number;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsOptional()
  @ValidateIf((o) => o.categoryId !== null)
  @IsNumber()
  @Type(() => Number)
  categoryId?: number | null;

  @IsOptional()
  @IsString()
  color?: string;
}

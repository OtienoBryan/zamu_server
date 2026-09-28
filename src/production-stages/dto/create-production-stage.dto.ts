import { IsString, IsNotEmpty, IsOptional, IsInt, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductionStageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequenceOrder?: number;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  store_id: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  part_id: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  quantity: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  min_stock_level?: number;

  @IsOptional()
  @IsString()
  location?: string;
}




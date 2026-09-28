import { IsInt, IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SetQuantityDto {
  @IsInt()
  @Type(() => Number)
  storeId: number;

  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

import { IsInt, IsNumber, IsPositive, IsIn, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdjustmentDto {
  @IsInt()
  @Type(() => Number)
  storeId: number;

  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsIn(['in', 'out'])
  direction: 'in' | 'out';

  @IsOptional()
  @IsString()
  notes?: string;
}

import { IsInt, IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class TransferDto {
  @IsInt()
  @Type(() => Number)
  fromStoreId: number;

  @IsInt()
  @Type(() => Number)
  toStoreId: number;

  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsOptional, Min, Max, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePosSaleItemDto {
  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  unitPrice: number;
}

export class CreatePosSaleDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  clientId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  storeId?: number;

  @ValidateNested({ each: true })
  @Type(() => CreatePosSaleItemDto)
  @ArrayMinSize(1)
  @IsNotEmpty()
  items: CreatePosSaleItemDto[];

  // Tax is exclusive: applied on top of the items' subtotal, not backed out of unit prices.
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  taxRate?: number;
}

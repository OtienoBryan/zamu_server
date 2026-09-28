import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsOptional, Min, Max, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePurchaseOrderItemDto {
  @IsInt()
  @Type(() => Number)
  rawMaterialId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @Type(() => Number)
  unitCost: number;
}

export class CreatePurchaseOrderDto {
  @IsInt()
  @Type(() => Number)
  supplierId: number;

  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseOrderItemDto)
  @ArrayMinSize(1)
  @IsNotEmpty()
  items: CreatePurchaseOrderItemDto[];

  // Tax is exclusive: applied on top of the items' subtotal, not backed out of unit costs.
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  taxRate?: number;
}

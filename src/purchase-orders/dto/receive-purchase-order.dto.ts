import { IsInt, IsNotEmpty, IsString, MaxLength, IsArray, ValidateNested, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReceivePurchaseOrderItemDto {
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantity: number;
}

export class ReceivePurchaseOrderDto {
  @IsInt()
  @Type(() => Number)
  storeId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  receivedBy: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceivePurchaseOrderItemDto)
  items: ReceivePurchaseOrderItemDto[];
}

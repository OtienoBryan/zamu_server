import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsOptional, Min, Max, ValidateNested, ArrayMinSize, IsDateString, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuotationItemDto {
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

export class CreateQuotationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  clientId?: number;

  @ValidateNested({ each: true })
  @Type(() => CreateQuotationItemDto)
  @ArrayMinSize(1)
  @IsNotEmpty()
  items: CreateQuotationItemDto[];

  // Tax is exclusive: applied on top of the items' subtotal, not backed out of unit prices.
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  taxRate?: number;

  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}

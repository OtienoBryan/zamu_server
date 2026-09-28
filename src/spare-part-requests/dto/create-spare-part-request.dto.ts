import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSparePartRequestItemDto {
  @IsInt()
  @Type(() => Number)
  sparePartId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
}

export class CreateSparePartRequestDto {
  @IsInt()
  @Type(() => Number)
  storeId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  machineId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  staffMemberId?: number;

  @ValidateNested({ each: true })
  @Type(() => CreateSparePartRequestItemDto)
  @ArrayMinSize(1)
  @IsNotEmpty()
  items: CreateSparePartRequestItemDto[];

  @IsOptional()
  @IsString()
  notes?: string;
}

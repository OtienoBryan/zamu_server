import { IsInt, IsNumber, IsPositive, IsIn, IsOptional, IsBoolean, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkOrderWasteDto {
  @IsInt()
  @Type(() => Number)
  workOrderId: number;

  @IsInt()
  @Type(() => Number)
  rawMaterialId: number;

  @IsInt()
  @Type(() => Number)
  storeId: number;

  @IsIn(['offcut', 'damage'])
  type: 'offcut' | 'damage';

  // Only applies to offcuts — damages are always treated as unusable regardless of what's sent.
  @IsOptional()
  @IsBoolean()
  reusable?: boolean;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}

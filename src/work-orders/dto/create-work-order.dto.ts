import { IsInt, IsNumber, IsPositive, IsOptional, IsIn, IsString, IsNotEmpty, IsDateString, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkOrderMaterialDto {
  @IsInt()
  @Type(() => Number)
  rawMaterialId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
}

export class CreateWorkOrderDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsInt()
  @Type(() => Number)
  stageId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Type(() => Number)
  staffIds: number[];

  @IsDateString()
  date: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  targetQuantity: number;

  @IsOptional()
  @IsIn(['pending', 'in_progress', 'completed', 'cancelled'])
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkOrderMaterialDto)
  materials?: WorkOrderMaterialDto[];
}

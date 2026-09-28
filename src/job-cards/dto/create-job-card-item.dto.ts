import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobCardItemDto {
  @IsEnum(['part', 'labor'])
  item_type: 'part' | 'labor';

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  part_id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  service_id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assigned_staff_id?: number;

  @IsOptional()
  @IsString()
  assigned_at?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cost?: number;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  taxable?: number;

  @IsNumber()
  @Type(() => Number)
  amount: number;
}

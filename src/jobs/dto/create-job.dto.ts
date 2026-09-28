import { IsString, IsOptional, IsIn, IsInt, IsNumber, IsPositive, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobDto {
  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  expectedEndDate: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsIn(['open', 'completed', 'cancelled'])
  status?: 'open' | 'completed' | 'cancelled';
}

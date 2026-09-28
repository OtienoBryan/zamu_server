import { IsInt, IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSalesPostingDto {
  @IsInt()
  @Type(() => Number)
  station_id: number;

  @IsDateString()
  period_start: string;

  @IsDateString()
  period_end: string;

  @IsNumber()
  @Type(() => Number)
  cash_posted: number;

  @IsNumber()
  @Type(() => Number)
  card_posted: number;

  @IsNumber()
  @Type(() => Number)
  mpesa_posted: number;

  @IsNumber()
  @Type(() => Number)
  credit_posted: number;

  @IsNumber()
  @Type(() => Number)
  other_posted: number;

  @IsNumber()
  @Type(() => Number)
  cash_system: number;

  @IsNumber()
  @Type(() => Number)
  card_system: number;

  @IsNumber()
  @Type(() => Number)
  mpesa_system: number;

  @IsNumber()
  @Type(() => Number)
  credit_system: number;

  @IsNumber()
  @Type(() => Number)
  other_system: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

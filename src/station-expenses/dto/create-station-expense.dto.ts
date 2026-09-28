import { IsNumber, IsNotEmpty, IsOptional, IsString, IsDateString, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStationExpenseDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  station_id: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id?: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsDateString()
  expense_date: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;
}

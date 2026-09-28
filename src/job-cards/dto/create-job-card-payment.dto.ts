import { IsNumber, IsPositive, IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobCardPaymentDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsEnum(['cash', 'mobile_money', 'card', 'bank_transfer', 'cheque', 'other'])
  payment_method: 'cash' | 'mobile_money' | 'card' | 'bank_transfer' | 'cheque' | 'other';

  @IsOptional()
  @IsString()
  reference?: string;

  @IsDateString()
  payment_date: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

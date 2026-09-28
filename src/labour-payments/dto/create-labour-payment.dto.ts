import { IsInt, IsNumber, IsPositive, IsDateString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLabourPaymentDto {
  @IsInt()
  @Type(() => Number)
  workOrderLogId: number;

  @IsInt()
  @Type(() => Number)
  staffId: number;

  @IsInt()
  @Type(() => Number)
  paymentAccountId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsDateString()
  paymentDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

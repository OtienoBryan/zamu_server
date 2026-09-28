import { IsInt, IsNumber, IsPositive, IsDateString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpensePaymentDto {
  @IsInt()
  @Type(() => Number)
  expenseId: number;

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

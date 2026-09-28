import { IsInt, IsNumber, IsPositive, IsDateString, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
  @IsInt()
  @Type(() => Number)
  expenseAccountId: number;

  @IsDateString()
  date: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

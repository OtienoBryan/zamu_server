import { IsInt, IsNumber, IsPositive, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkOrderLogDto {
  @IsInt()
  @Type(() => Number)
  workOrderId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantityDone: number;
}

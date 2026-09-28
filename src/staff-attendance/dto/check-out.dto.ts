import { IsDateString } from 'class-validator';

export class CheckOutDto {
  @IsDateString()
  checkOutAt: string;
}

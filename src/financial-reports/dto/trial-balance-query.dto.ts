import { IsDateString } from 'class-validator';

export class TrialBalanceQueryDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

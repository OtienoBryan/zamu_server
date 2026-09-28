import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ConvertQuotationDto {
  @IsInt()
  @Type(() => Number)
  storeId: number;
}

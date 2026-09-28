import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfirmWorkOrderDto {
  @IsInt()
  @Type(() => Number)
  storeId: number;
}

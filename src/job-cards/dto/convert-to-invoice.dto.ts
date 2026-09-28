import { IsBoolean, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ConvertToInvoiceDto {
  @IsBoolean()
  update_inventory: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  store_id?: number;
}

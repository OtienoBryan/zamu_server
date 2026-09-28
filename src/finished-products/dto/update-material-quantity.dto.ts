import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMaterialQuantityDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
}

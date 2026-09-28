import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AddMaterialDto {
  @IsInt()
  @Type(() => Number)
  rawMaterialId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
}

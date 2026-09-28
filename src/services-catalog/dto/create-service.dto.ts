import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  rate: number;

  @IsEnum(['fixed', 'hourly'])
  pricing_type: 'fixed' | 'hourly';

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  is_active?: number;
}

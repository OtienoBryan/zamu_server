import { IsNumber, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFuelPriceDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  stationId: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  fuelType?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}


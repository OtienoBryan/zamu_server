import { IsNumber, IsNotEmpty, IsOptional, IsString, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStationTankDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  station_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  current_quantity?: number;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'maintenance'])
  status?: 'active' | 'inactive' | 'maintenance';
}

import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  omc_id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsString()
  latitude?: string;

  @IsNumber()
  @Type(() => Number)
  regionId: number;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lpgQuantity?: number;
}


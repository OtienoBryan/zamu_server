import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @IsNumber()
  @Type(() => Number)
  key_account_id: number;

  @IsString()
  @IsNotEmpty()
  registration_number: string;

  @IsOptional()
  @IsString()
  vin_serial_number?: string;

  @IsOptional()
  @IsString()
  vehicle_type?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  year?: number;

  @IsOptional()
  @IsString()
  make?: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsOptional()
  @IsString()
  trim_option?: string;

  @IsOptional()
  @IsString()
  transmission_type?: string;

  @IsOptional()
  @IsString()
  driven_wheel?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  current_odo?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsString()
  @IsNotEmpty()
  driver_name: string;

  @IsString()
  @IsNotEmpty()
  driver_contact: string;
}

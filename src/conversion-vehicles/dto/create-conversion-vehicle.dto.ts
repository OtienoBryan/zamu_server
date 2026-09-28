import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsArray, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class VehicleDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateConversionVehicleDto {
  @IsNumber()
  @Type(() => Number)
  conversion_client_id: number;

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
  @IsString()
  engine?: string;

  @IsOptional()
  @IsString()
  engine_capacity?: string;

  @IsOptional()
  @IsString()
  engine_code?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  current_odo?: number;

  @IsOptional()
  @IsEnum(['KM', 'Miles'])
  odo_unit?: 'KM' | 'Miles';

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  unit_number?: string;

  @IsOptional()
  @IsIn(['37L Internal', '42L Internal', '42L External', '92L'])
  tank_capacity?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tank_year_of_production?: number;

  @IsOptional()
  @IsString()
  tank_serial_number?: string;

  @IsOptional()
  @IsString()
  kit_serial_number?: string;

  @IsOptional()
  @IsIn(['Manual Tracking', 'OBD2 + TM', 'TM'])
  telemetry_status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  photo_url?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photo_urls?: string[];

  @IsOptional()
  @IsString()
  vsa_url?: string;

  @IsOptional()
  @IsString()
  logbook_url?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleDocumentDto)
  documents?: VehicleDocumentDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}

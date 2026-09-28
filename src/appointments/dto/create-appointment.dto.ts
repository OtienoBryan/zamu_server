import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsDateString()
  appointment_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  conversion_client_id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  conversion_vehicle_id?: number;

  @IsOptional()
  @IsEnum(['scheduled', 'completed', 'cancelled'])
  status?: 'scheduled' | 'completed' | 'cancelled';
}

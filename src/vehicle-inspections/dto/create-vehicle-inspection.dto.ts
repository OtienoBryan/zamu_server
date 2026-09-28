import { IsInt, IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVehicleInspectionDto {
  @IsInt()
  @Type(() => Number)
  conversion_vehicle_id: number;

  @IsInt()
  @Type(() => Number)
  conversion_client_id: number;

  @IsInt()
  @Type(() => Number)
  assigned_staff_id: number;

  @IsDateString()
  inspection_date: string;

  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed'])
  status?: 'pending' | 'in_progress' | 'completed';

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  checklist?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  issues_found?: number;
}

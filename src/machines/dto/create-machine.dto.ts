import { IsString, IsNotEmpty, IsOptional, IsInt, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  machineCode?: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  storeId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maintenanceIntervalDays?: number | null;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['active', 'inactive', 'in_repair'])
  status?: 'active' | 'inactive' | 'in_repair';
}

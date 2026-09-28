import { IsInt, IsString, IsNotEmpty, IsOptional, IsDateString, IsArray, ValidateNested, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class MachineServicePartDto {
  @IsInt()
  @Type(() => Number)
  sparePartId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
}

export class CreateMachineServiceDto {
  @IsInt()
  @Type(() => Number)
  machineId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  storeId?: number;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MachineServicePartDto)
  parts?: MachineServicePartDto[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  workerIds?: number[];
}

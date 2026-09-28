import { IsString, IsNotEmpty, IsOptional, IsIn, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStaffMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  hourlyRate?: number;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

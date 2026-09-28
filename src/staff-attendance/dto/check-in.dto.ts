import { IsInt, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckInDto {
  @IsInt()
  @Type(() => Number)
  staffMemberId: number;

  @IsDateString()
  checkInAt: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}

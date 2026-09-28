import { IsInt, IsDateString, IsOptional, IsString, IsIn, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import type { StaffLeaveType } from '../../entities/staff-member-leave.entity';
import { STAFF_LEAVE_TYPES } from '../../entities/staff-member-leave.entity';

export class CreateStaffLeaveDto {
  @IsInt()
  @Type(() => Number)
  staffMemberId: number;

  @IsOptional()
  @IsIn(STAFF_LEAVE_TYPES)
  leaveType?: StaffLeaveType;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  reason?: string;
}

import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class DecideStaffLeaveDto {
  @IsIn(['approved', 'declined'])
  status: 'approved' | 'declined';

  @IsOptional()
  @IsString()
  @MaxLength(255)
  decisionNotes?: string;
}

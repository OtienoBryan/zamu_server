import type { StaffLeaveType } from '../../entities/staff-member-leave.entity';
export declare class CreateStaffLeaveDto {
    staffMemberId: number;
    leaveType?: StaffLeaveType;
    startDate: string;
    endDate: string;
    reason?: string;
}

import { StaffMember } from './staff-member.entity';
export type StaffLeaveType = 'annual' | 'sick' | 'unpaid' | 'compassionate' | 'maternity_paternity' | 'other';
export declare const STAFF_LEAVE_TYPES: StaffLeaveType[];
export type StaffLeaveStatus = 'pending' | 'approved' | 'declined';
export declare class StaffMemberLeave {
    id: number;
    staffMemberId: number;
    staffMember: StaffMember;
    leaveType: StaffLeaveType;
    startDate: string;
    endDate: string;
    reason: string | null;
    status: StaffLeaveStatus;
    decisionNotes: string | null;
    createdAt: Date;
}

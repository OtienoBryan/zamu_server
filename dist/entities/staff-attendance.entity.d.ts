import { StaffMember } from './staff-member.entity';
export declare class StaffAttendance {
    id: number;
    staffMemberId: number;
    staffMember: StaffMember;
    checkInAt: Date;
    checkOutAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export declare class StaffLeave {
    id: number;
    staff_id: number;
    leave_type_id: number;
    start_date: Date;
    end_date: Date;
    reason: string | null;
    attachment_url: string | null;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    is_half_day: number;
    approved_by: number | null;
    applied_at: Date;
    updated_at: Date;
}

import { WorkOrder } from './work-order.entity';
import { StaffMember } from './staff-member.entity';
export declare class WorkOrderStaff {
    id: number;
    workOrderId: number;
    workOrder: WorkOrder;
    staffMemberId: number;
    staffMember: StaffMember;
    createdAt: Date;
}

import { WorkOrderLog } from './work-order-log.entity';
import { StaffMember } from './staff-member.entity';
import { ChartOfAccount } from './chart-of-account.entity';
export declare class LabourPayment {
    id: number;
    workOrderLogId: number;
    workOrderLog: WorkOrderLog;
    staffId: number;
    staff: StaffMember;
    paymentAccountId: number;
    paymentAccount: ChartOfAccount;
    amount: number;
    paymentDate: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}

import { MachineServiceRecord } from './machine-service-record.entity';
import { StaffMember } from './staff-member.entity';
export declare class MachineServiceWorker {
    id: number;
    serviceRecordId: number;
    serviceRecord: MachineServiceRecord;
    staffMemberId: number;
    staffMember: StaffMember;
    createdAt: Date;
}

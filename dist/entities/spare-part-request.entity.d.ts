import { RawMaterialStore } from './raw-material-store.entity';
import { SparePartRequestItem } from './spare-part-request-item.entity';
import { Machine } from './machine.entity';
import { StaffMember } from './staff-member.entity';
export type SparePartRequestStatus = 'pending' | 'fulfilled' | 'cancelled';
export declare class SparePartRequest {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    machineId: number | null;
    machine: Machine | null;
    staffMemberId: number | null;
    staffMember: StaffMember | null;
    status: SparePartRequestStatus;
    requestedBy: number | null;
    notes: string | null;
    fulfilledAt: Date | null;
    fulfillmentNotes: string | null;
    items: SparePartRequestItem[];
    createdAt: Date;
    updatedAt: Date;
}

import { MachineServiceRecord } from './machine-service-record.entity';
import { SparePart } from './spare-part.entity';
export declare class MachineServicePart {
    id: number;
    serviceRecordId: number;
    serviceRecord: MachineServiceRecord;
    sparePartId: number;
    sparePart: SparePart;
    quantity: number;
    createdAt: Date;
}

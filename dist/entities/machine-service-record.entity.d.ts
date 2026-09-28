import { Machine } from './machine.entity';
import { RawMaterialStore } from './raw-material-store.entity';
import { MachineServicePart } from './machine-service-part.entity';
import { MachineServiceWorker } from './machine-service-worker.entity';
export declare class MachineServiceRecord {
    id: number;
    machineId: number;
    machine: Machine;
    storeId: number | null;
    store: RawMaterialStore | null;
    startAt: Date;
    endAt: Date;
    description: string;
    createdBy: number | null;
    createdAt: Date;
    updatedAt: Date;
    parts: MachineServicePart[];
    workers: MachineServiceWorker[];
}

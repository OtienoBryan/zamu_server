import { RawMaterialStore } from './raw-material-store.entity';
import { Machine } from './machine.entity';
export declare class MachineStoreInventory {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    machineId: number;
    machine: Machine;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

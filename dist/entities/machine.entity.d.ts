import { MachineCategory } from './machine-category.entity';
import { RawMaterialStore } from './raw-material-store.entity';
export declare class Machine {
    id: number;
    name: string;
    machineCode: string | null;
    serialNumber: string | null;
    categoryId: number | null;
    category: MachineCategory | null;
    storeId: number | null;
    store: RawMaterialStore | null;
    maintenanceIntervalDays: number | null;
    description: string | null;
    status: 'active' | 'inactive' | 'in_repair';
    createdAt: Date;
    updatedAt: Date;
}

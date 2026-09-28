import { WorkOrder } from './work-order.entity';
import { RawMaterial } from './raw-material.entity';
import { RawMaterialStore } from './raw-material-store.entity';
export type WorkOrderWasteType = 'offcut' | 'damage';
export type WorkOrderWasteStockAction = 'returned' | 'deducted';
export declare class WorkOrderWasteEntry {
    id: number;
    workOrderId: number;
    workOrder: WorkOrder;
    rawMaterialId: number;
    rawMaterial: RawMaterial;
    storeId: number;
    store: RawMaterialStore;
    type: WorkOrderWasteType;
    reusable: boolean;
    quantity: number;
    stockAction: WorkOrderWasteStockAction;
    notes: string | null;
    createdAt: Date;
}

import { WorkOrder } from './work-order.entity';
import { RawMaterial } from './raw-material.entity';
export declare class WorkOrderMaterial {
    id: number;
    workOrderId: number;
    workOrder: WorkOrder;
    rawMaterialId: number;
    rawMaterial: RawMaterial;
    quantity: number;
    createdAt: Date;
}

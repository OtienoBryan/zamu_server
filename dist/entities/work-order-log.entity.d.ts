import { WorkOrder } from './work-order.entity';
export declare class WorkOrderLog {
    id: number;
    workOrderId: number;
    workOrder: WorkOrder;
    startTime: Date;
    endTime: Date;
    quantityDone: number;
    createdAt: Date;
    updatedAt: Date;
}

export declare class WorkOrderMaterialDto {
    rawMaterialId: number;
    quantity: number;
}
export declare class CreateWorkOrderDto {
    description: string;
    productId: number;
    stageId: number;
    staffIds: number[];
    date: string;
    targetQuantity: number;
    status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    materials?: WorkOrderMaterialDto[];
}

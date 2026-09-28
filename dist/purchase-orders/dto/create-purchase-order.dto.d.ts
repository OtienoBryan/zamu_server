export declare class CreatePurchaseOrderItemDto {
    rawMaterialId: number;
    quantity: number;
    unitCost: number;
}
export declare class CreatePurchaseOrderDto {
    supplierId: number;
    items: CreatePurchaseOrderItemDto[];
    taxRate?: number;
}

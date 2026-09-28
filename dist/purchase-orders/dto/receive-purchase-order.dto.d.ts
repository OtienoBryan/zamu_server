export declare class ReceivePurchaseOrderItemDto {
    id: number;
    quantity: number;
}
export declare class ReceivePurchaseOrderDto {
    storeId: number;
    receivedBy: string;
    items: ReceivePurchaseOrderItemDto[];
}

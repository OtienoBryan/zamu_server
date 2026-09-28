export declare class CreatePosSaleItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
}
export declare class CreatePosSaleDto {
    clientId?: number;
    storeId?: number;
    items: CreatePosSaleItemDto[];
    taxRate?: number;
}

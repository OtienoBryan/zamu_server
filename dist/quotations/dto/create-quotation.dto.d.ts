export declare class CreateQuotationItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
}
export declare class CreateQuotationDto {
    clientId?: number;
    items: CreateQuotationItemDto[];
    taxRate?: number;
    validUntil?: string;
    notes?: string;
}

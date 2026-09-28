export declare class CreateAdjustmentDto {
    storeId: number;
    productId: number;
    quantity: number;
    direction: 'in' | 'out';
    notes?: string;
}

export declare class CreateAdjustmentDto {
    storeId: number;
    sparePartId: number;
    quantity: number;
    direction: 'in' | 'out';
    notes?: string;
}

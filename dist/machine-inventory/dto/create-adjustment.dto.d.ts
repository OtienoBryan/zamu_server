export declare class CreateAdjustmentDto {
    storeId: number;
    machineId: number;
    quantity: number;
    direction: 'in' | 'out';
    notes?: string;
}

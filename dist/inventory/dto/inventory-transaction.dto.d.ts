export declare enum TransactionType {
    IN = "IN",
    OUT = "OUT",
    ADJUSTMENT = "ADJUSTMENT",
    TRANSFER_IN = "TRANSFER_IN",
    TRANSFER_OUT = "TRANSFER_OUT"
}
export declare class InventoryTransactionDto {
    store_id: number;
    part_id: number;
    transaction_type: TransactionType;
    quantity: number;
    reference_number?: string;
    notes?: string;
    created_by?: number;
}

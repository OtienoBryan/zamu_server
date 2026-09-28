export type VendorTransactionType = 'PURCHASE' | 'PAYMENT' | 'ADJUSTMENT';
export declare class VendorLedger {
    id: number;
    vendor_id: number;
    transaction_type: VendorTransactionType;
    debit: number;
    credit: number;
    balance: number;
    reference_number?: string | null;
    description?: string | null;
    notes?: string | null;
    created_by?: number | null;
    created_at: Date;
}

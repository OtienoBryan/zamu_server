import { TransactionType } from './inventory-transaction.dto';
export declare class CreateInventoryLedgerDto {
    inventory_id: number;
    store_id: number;
    part_id: number;
    transactionType: TransactionType;
    quantity: number;
    previous_quantity: number;
    new_quantity: number;
    reference_number?: string;
    notes?: string;
    created_by?: number;
}

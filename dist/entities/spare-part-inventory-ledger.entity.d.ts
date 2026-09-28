import { RawMaterialStore } from './raw-material-store.entity';
import { SparePart } from './spare-part.entity';
export type SparePartLedgerTransactionType = 'adjustment_in' | 'adjustment_out' | 'transfer_in' | 'transfer_out';
export declare class SparePartInventoryLedger {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    sparePartId: number;
    sparePart: SparePart;
    transactionType: SparePartLedgerTransactionType;
    quantity: number;
    previousQuantity: number;
    newQuantity: number;
    notes: string | null;
    createdBy: number | null;
    createdAt: Date;
}

import { RawMaterialStore } from './raw-material-store.entity';
import { FinishedProduct } from './finished-product.entity';
export type FinishedProductLedgerTransactionType = 'production_receipt' | 'sale_issue' | 'adjustment_in' | 'adjustment_out' | 'transfer_in' | 'transfer_out';
export declare class FinishedProductInventoryLedger {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    productId: number;
    product: FinishedProduct;
    transactionType: FinishedProductLedgerTransactionType;
    quantity: number;
    previousQuantity: number;
    newQuantity: number;
    notes: string | null;
    createdBy: number | null;
    createdAt: Date;
}

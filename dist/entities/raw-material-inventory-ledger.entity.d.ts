import { RawMaterialStore } from './raw-material-store.entity';
import { RawMaterial } from './raw-material.entity';
import { RawMaterialPurchaseOrder } from './raw-material-purchase-order.entity';
export type InventoryLedgerTransactionType = 'purchase_receipt' | 'adjustment' | 'production_use';
export declare class RawMaterialInventoryLedger {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    rawMaterialId: number;
    rawMaterial: RawMaterial;
    purchaseOrderId: number | null;
    purchaseOrder: RawMaterialPurchaseOrder | null;
    transactionType: InventoryLedgerTransactionType;
    quantity: number;
    previousQuantity: number;
    newQuantity: number;
    notes: string | null;
    createdAt: Date;
}

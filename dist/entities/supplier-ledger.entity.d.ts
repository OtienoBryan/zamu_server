import { Supplier } from './supplier.entity';
import { RawMaterialPurchaseOrder } from './raw-material-purchase-order.entity';
import { ChartOfAccount } from './chart-of-account.entity';
export type SupplierLedgerTransactionType = 'purchase' | 'payment' | 'adjustment';
export declare class SupplierLedger {
    id: number;
    supplierId: number;
    supplier: Supplier;
    purchaseOrderId: number | null;
    purchaseOrder: RawMaterialPurchaseOrder | null;
    transactionType: SupplierLedgerTransactionType;
    amount: number;
    previousBalance: number;
    newBalance: number;
    notes: string | null;
    paymentAccountId: number | null;
    paymentAccount: ChartOfAccount | null;
    createdBy: number | null;
    createdAt: Date;
}

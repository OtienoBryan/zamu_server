import { Supplier } from './supplier.entity';
import { RawMaterialStore } from './raw-material-store.entity';
import { RawMaterialPurchaseOrderItem } from './raw-material-purchase-order-item.entity';
export type PurchaseOrderStatus = 'pending' | 'received' | 'cancelled';
export declare class RawMaterialPurchaseOrder {
    id: number;
    supplierId: number;
    supplier: Supplier;
    storeId: number | null;
    store: RawMaterialStore | null;
    status: PurchaseOrderStatus;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    orderedAt: Date;
    receivedAt: Date | null;
    receivedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: RawMaterialPurchaseOrderItem[];
}

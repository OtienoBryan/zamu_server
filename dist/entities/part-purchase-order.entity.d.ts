import { PartPurchaseOrderItem } from './part-purchase-order-item.entity';
export type POStatus = 'draft' | 'sent' | 'received' | 'cancelled';
export declare class PartPurchaseOrder {
    id: number;
    po_number: string;
    vendor_id: number;
    store_id?: number | null;
    order_date: string;
    expected_delivery_date?: string | null;
    status: POStatus;
    subtotal: number;
    total_amount: number;
    notes?: string | null;
    created_at: Date;
    updated_at: Date;
    items: PartPurchaseOrderItem[];
}

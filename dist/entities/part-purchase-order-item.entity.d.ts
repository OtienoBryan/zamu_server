import { PartPurchaseOrder } from './part-purchase-order.entity';
import { Part } from './part.entity';
export declare class PartPurchaseOrderItem {
    id: number;
    purchase_order_id: number;
    part_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    purchase_order: PartPurchaseOrder;
    part: Part;
}

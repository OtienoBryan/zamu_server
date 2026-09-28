import { RawMaterialPurchaseOrder } from './raw-material-purchase-order.entity';
import { RawMaterial } from './raw-material.entity';
export declare class RawMaterialPurchaseOrderItem {
    id: number;
    purchaseOrderId: number;
    purchaseOrder: RawMaterialPurchaseOrder;
    rawMaterialId: number;
    rawMaterial: RawMaterial;
    quantity: number;
    receivedQuantity: number | null;
    unitCost: number;
    totalCost: number;
}

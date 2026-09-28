import { PosSale } from './pos-sale.entity';
import { FinishedProduct } from './finished-product.entity';
export declare class PosSaleItem {
    id: number;
    posSaleId: number;
    sale: PosSale;
    productId: number;
    product: FinishedProduct;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

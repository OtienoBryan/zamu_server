import { Quotation } from './quotation.entity';
import { FinishedProduct } from './finished-product.entity';
export declare class QuotationItem {
    id: number;
    quotationId: number;
    quotation: Quotation;
    productId: number;
    product: FinishedProduct;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

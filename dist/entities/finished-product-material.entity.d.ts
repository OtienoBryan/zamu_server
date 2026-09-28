import { FinishedProduct } from './finished-product.entity';
import { RawMaterial } from './raw-material.entity';
export declare class FinishedProductMaterial {
    id: number;
    finishedProductId: number;
    finishedProduct: FinishedProduct;
    rawMaterialId: number;
    rawMaterial: RawMaterial;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

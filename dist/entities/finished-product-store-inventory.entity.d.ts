import { RawMaterialStore } from './raw-material-store.entity';
import { FinishedProduct } from './finished-product.entity';
export declare class FinishedProductStoreInventory {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    productId: number;
    product: FinishedProduct;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

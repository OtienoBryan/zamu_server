import { RawMaterialStore } from './raw-material-store.entity';
import { RawMaterial } from './raw-material.entity';
export declare class RawMaterialStoreInventory {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    rawMaterialId: number;
    rawMaterial: RawMaterial;
    quantity: number;
    updatedAt: Date;
}

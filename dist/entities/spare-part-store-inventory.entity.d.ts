import { RawMaterialStore } from './raw-material-store.entity';
import { SparePart } from './spare-part.entity';
export declare class SparePartStoreInventory {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    sparePartId: number;
    sparePart: SparePart;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

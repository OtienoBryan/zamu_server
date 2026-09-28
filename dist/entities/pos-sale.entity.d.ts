import { PosSaleItem } from './pos-sale-item.entity';
import { ClientRecord } from './client-record.entity';
import { RawMaterialStore } from './raw-material-store.entity';
import { Staff } from './staff.entity';
export declare class PosSale {
    id: number;
    clientId: number | null;
    client: ClientRecord | null;
    storeId: number | null;
    store: RawMaterialStore | null;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    createdBy: number | null;
    postedByStaff: Staff | null;
    createdAt: Date;
    updatedAt: Date;
    items: PosSaleItem[];
}

import { Part } from './part.entity';
export declare class PartInventory {
    id: number;
    store_id: number;
    part_id: number;
    part?: Part;
    quantity: number;
    min_stock_level?: number | null;
    location?: string | null;
    last_updated: Date;
}

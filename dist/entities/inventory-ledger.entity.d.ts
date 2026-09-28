import { Inventory } from './inventory.entity';
import { Station } from './station.entity';
import { Part } from './part.entity';
import { TransactionType } from '../inventory/dto/inventory-transaction.dto';
export declare class InventoryLedger {
    id: number;
    inventory_id: number;
    store_id: number;
    part_id: number;
    transaction_type: TransactionType;
    quantity: number;
    previous_quantity: number;
    new_quantity: number;
    reference_number?: string | null;
    notes?: string | null;
    created_by?: number | null;
    created_at: Date;
    inventory?: Inventory;
    store?: Station;
    part?: Part;
}

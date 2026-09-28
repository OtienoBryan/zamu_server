import { Repository } from 'typeorm';
import { PartPurchaseOrder } from '../entities/part-purchase-order.entity';
import { PartPurchaseOrderItem } from '../entities/part-purchase-order-item.entity';
import { Inventory } from '../entities/inventory.entity';
import { InventoryLedger } from '../entities/inventory-ledger.entity';
import { Vendor } from '../entities/vendor.entity';
import { VendorLedger } from '../entities/vendor-ledger.entity';
interface CreatePODto {
    vendor_id: number;
    store_id?: number | null;
    order_date: string;
    expected_delivery_date?: string | null;
    notes?: string | null;
    items: {
        part_id: number;
        quantity: number;
        unit_price: number;
    }[];
}
export declare class PartPurchaseOrdersService {
    private poRepo;
    private itemRepo;
    private invRepo;
    private invLedgerRepo;
    private vendorRepo;
    private vendorLedgerRepo;
    constructor(poRepo: Repository<PartPurchaseOrder>, itemRepo: Repository<PartPurchaseOrderItem>, invRepo: Repository<Inventory>, invLedgerRepo: Repository<InventoryLedger>, vendorRepo: Repository<Vendor>, vendorLedgerRepo: Repository<VendorLedger>);
    findAll(): Promise<PartPurchaseOrder[]>;
    findOne(id: number): Promise<PartPurchaseOrder>;
    generatePoNumber(): Promise<string>;
    create(dto: CreatePODto): Promise<PartPurchaseOrder>;
    updateStatus(id: number, status: string, incomingStoreId?: number): Promise<PartPurchaseOrder>;
    remove(id: number): Promise<void>;
}
export {};

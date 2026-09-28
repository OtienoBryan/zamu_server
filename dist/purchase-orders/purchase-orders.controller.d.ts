import { PurchaseOrdersService } from './purchase-orders.service';
import { RawMaterialPurchaseOrder } from '../entities/raw-material-purchase-order.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { ReceivePurchaseOrderDto } from './dto/receive-purchase-order.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class PurchaseOrdersController {
    private readonly purchaseOrdersService;
    constructor(purchaseOrdersService: PurchaseOrdersService);
    findAllStores(): Promise<RawMaterialStore[]>;
    createStore(dto: CreateStoreDto): Promise<RawMaterialStore>;
    updateStore(id: number, dto: UpdateStoreDto): Promise<RawMaterialStore>;
    removeStore(id: number): Promise<{
        message: string;
    }>;
    findAllInventory(): Promise<RawMaterialStoreInventory[]>;
    findStoreInventory(storeId: number): Promise<RawMaterialStoreInventory[]>;
    findInventoryLedger(): Promise<RawMaterialInventoryLedger[]>;
    findAll(): Promise<RawMaterialPurchaseOrder[]>;
    findOne(id: number): Promise<RawMaterialPurchaseOrder>;
    create(dto: CreatePurchaseOrderDto): Promise<RawMaterialPurchaseOrder>;
    receive(id: number, dto: ReceivePurchaseOrderDto, req: any): Promise<RawMaterialPurchaseOrder>;
    cancel(id: number): Promise<RawMaterialPurchaseOrder>;
}

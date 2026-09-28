import { FinishedProductInventoryService } from './finished-product-inventory.service';
import { FinishedProductStoreInventory } from '../entities/finished-product-store-inventory.entity';
import { FinishedProductInventoryLedger } from '../entities/finished-product-inventory-ledger.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';
export declare class FinishedProductInventoryController {
    private readonly inventoryService;
    constructor(inventoryService: FinishedProductInventoryService);
    findAllInventory(): Promise<FinishedProductStoreInventory[]>;
    findLedger(productId?: string): Promise<FinishedProductInventoryLedger[]>;
    createAdjustment(dto: CreateAdjustmentDto, req: any): Promise<FinishedProductInventoryLedger>;
    setQuantity(dto: SetQuantityDto, req: any): Promise<FinishedProductInventoryLedger>;
    transfer(dto: TransferDto, req: any): Promise<{
        from: FinishedProductInventoryLedger;
        to: FinishedProductInventoryLedger;
    }>;
}

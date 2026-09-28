import { SparePartInventoryService } from './spare-part-inventory.service';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';
export declare class SparePartInventoryController {
    private readonly inventoryService;
    constructor(inventoryService: SparePartInventoryService);
    findAllInventory(): Promise<SparePartStoreInventory[]>;
    findLedger(sparePartId?: string): Promise<SparePartInventoryLedger[]>;
    createAdjustment(dto: CreateAdjustmentDto, req: any): Promise<SparePartInventoryLedger>;
    setQuantity(dto: SetQuantityDto, req: any): Promise<SparePartInventoryLedger>;
    transfer(dto: TransferDto, req: any): Promise<{
        from: SparePartInventoryLedger;
        to: SparePartInventoryLedger;
    }>;
}

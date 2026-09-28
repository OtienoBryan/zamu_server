import { MachineInventoryService } from './machine-inventory.service';
import { MachineStoreInventory } from '../entities/machine-store-inventory.entity';
import { MachineInventoryLedger } from '../entities/machine-inventory-ledger.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';
export declare class MachineInventoryController {
    private readonly inventoryService;
    constructor(inventoryService: MachineInventoryService);
    findAllInventory(): Promise<MachineStoreInventory[]>;
    findLedger(machineId?: string): Promise<MachineInventoryLedger[]>;
    createAdjustment(dto: CreateAdjustmentDto, req: any): Promise<MachineInventoryLedger>;
    setQuantity(dto: SetQuantityDto, req: any): Promise<MachineInventoryLedger>;
    transfer(dto: TransferDto, req: any): Promise<{
        from: MachineInventoryLedger;
        to: MachineInventoryLedger;
    }>;
}

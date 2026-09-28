import { Repository, DataSource } from 'typeorm';
import { MachineStoreInventory } from '../entities/machine-store-inventory.entity';
import { MachineInventoryLedger } from '../entities/machine-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { Machine } from '../entities/machine.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';
export declare class MachineInventoryService {
    private inventoryRepository;
    private ledgerRepository;
    private storeRepository;
    private machineRepository;
    private dataSource;
    constructor(inventoryRepository: Repository<MachineStoreInventory>, ledgerRepository: Repository<MachineInventoryLedger>, storeRepository: Repository<RawMaterialStore>, machineRepository: Repository<Machine>, dataSource: DataSource);
    findAllInventory(): Promise<MachineStoreInventory[]>;
    findLedger(machineId?: number): Promise<MachineInventoryLedger[]>;
    private applyMovement;
    createAdjustment(dto: CreateAdjustmentDto, createdBy: number): Promise<MachineInventoryLedger>;
    setQuantity(dto: SetQuantityDto, createdBy: number): Promise<MachineInventoryLedger>;
    transfer(dto: TransferDto, createdBy: number): Promise<{
        from: MachineInventoryLedger;
        to: MachineInventoryLedger;
    }>;
}

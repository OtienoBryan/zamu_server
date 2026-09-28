import { Repository, DataSource } from 'typeorm';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';
export declare class SparePartInventoryService {
    private inventoryRepository;
    private ledgerRepository;
    private storeRepository;
    private sparePartRepository;
    private dataSource;
    constructor(inventoryRepository: Repository<SparePartStoreInventory>, ledgerRepository: Repository<SparePartInventoryLedger>, storeRepository: Repository<RawMaterialStore>, sparePartRepository: Repository<SparePart>, dataSource: DataSource);
    findAllInventory(): Promise<SparePartStoreInventory[]>;
    findLedger(sparePartId?: number): Promise<SparePartInventoryLedger[]>;
    private applyMovement;
    createAdjustment(dto: CreateAdjustmentDto, createdBy: number): Promise<SparePartInventoryLedger>;
    setQuantity(dto: SetQuantityDto, createdBy: number): Promise<SparePartInventoryLedger>;
    transfer(dto: TransferDto, createdBy: number): Promise<{
        from: SparePartInventoryLedger;
        to: SparePartInventoryLedger;
    }>;
}

import { Repository, DataSource } from 'typeorm';
import { FinishedProductStoreInventory } from '../entities/finished-product-store-inventory.entity';
import { FinishedProductInventoryLedger } from '../entities/finished-product-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';
export declare class FinishedProductInventoryService {
    private inventoryRepository;
    private ledgerRepository;
    private storeRepository;
    private productRepository;
    private dataSource;
    constructor(inventoryRepository: Repository<FinishedProductStoreInventory>, ledgerRepository: Repository<FinishedProductInventoryLedger>, storeRepository: Repository<RawMaterialStore>, productRepository: Repository<FinishedProduct>, dataSource: DataSource);
    findAllInventory(): Promise<FinishedProductStoreInventory[]>;
    findLedger(productId?: number): Promise<FinishedProductInventoryLedger[]>;
    private applyMovement;
    createAdjustment(dto: CreateAdjustmentDto, createdBy: number): Promise<FinishedProductInventoryLedger>;
    setQuantity(dto: SetQuantityDto, createdBy: number): Promise<FinishedProductInventoryLedger>;
    transfer(dto: TransferDto, createdBy: number): Promise<{
        from: FinishedProductInventoryLedger;
        to: FinishedProductInventoryLedger;
    }>;
}

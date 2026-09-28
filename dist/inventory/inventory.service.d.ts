import { Repository, DataSource } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { InventoryLedger } from '../entities/inventory-ledger.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryTransactionDto } from './dto/inventory-transaction.dto';
export declare class InventoryService {
    private inventoryRepository;
    private inventoryLedgerRepository;
    private dataSource;
    constructor(inventoryRepository: Repository<Inventory>, inventoryLedgerRepository: Repository<InventoryLedger>, dataSource: DataSource);
    findAll(): Promise<Inventory[]>;
    findByStore(storeId: number): Promise<Inventory[]>;
    findByPart(partId: number): Promise<Inventory[]>;
    findOne(id: number): Promise<Inventory>;
    create(createInventoryDto: CreateInventoryDto): Promise<Inventory>;
    update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory>;
    recordTransaction(transactionDto: InventoryTransactionDto): Promise<{
        inventory: Inventory;
        ledger: InventoryLedger;
    }>;
    findLedgerByPart(partId: number): Promise<InventoryLedger[]>;
    findLedger(): Promise<InventoryLedger[]>;
    remove(id: number): Promise<void>;
    getInventoryByStore(): Promise<any[]>;
}

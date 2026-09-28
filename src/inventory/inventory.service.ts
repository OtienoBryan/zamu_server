import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { InventoryLedger } from '../entities/inventory-ledger.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryTransactionDto, TransactionType } from './dto/inventory-transaction.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(InventoryLedger)
    private inventoryLedgerRepository: Repository<InventoryLedger>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Inventory[]> {
    console.log('📦 [InventoryService] Finding all inventory');
    
    const inventory = await this.inventoryRepository.find({
      relations: ['store', 'part'],
      order: { last_updated: 'DESC' },
    });
    
    console.log(`✅ [InventoryService] Found ${inventory.length} inventory records`);
    return inventory;
  }

  async findByStore(storeId: number): Promise<Inventory[]> {
    console.log(`📦 [InventoryService] Finding inventory for store: ${storeId}`);
    
    const inventory = await this.inventoryRepository.find({
      where: { store_id: storeId },
      relations: ['store', 'part'],
      order: { last_updated: 'DESC' },
    });
    
    return inventory;
  }

  async findByPart(partId: number): Promise<Inventory[]> {
    console.log(`📦 [InventoryService] Finding inventory for part: ${partId}`);
    
    const inventory = await this.inventoryRepository.find({
      where: { part_id: partId },
      relations: ['store', 'part'],
      order: { last_updated: 'DESC' },
    });
    
    return inventory;
  }

  async findOne(id: number): Promise<Inventory> {
    console.log(`📦 [InventoryService] Finding inventory by ID: ${id}`);
    
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['store', 'part'],
    });
    
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    
    return inventory;
  }

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    console.log('📦 [InventoryService] Creating/updating inventory record');
    
    // Check if inventory record already exists for this store and part
    const existing = await this.inventoryRepository.findOne({
      where: {
        store_id: createInventoryDto.store_id,
        part_id: createInventoryDto.part_id,
      },
      relations: ['store', 'part'],
    });
    
    // If exists, update it with the new values
    if (existing) {
      console.log('📦 [InventoryService] Inventory record exists, updating instead');
      existing.quantity = createInventoryDto.quantity !== undefined ? createInventoryDto.quantity : existing.quantity;
      existing.min_stock_level = createInventoryDto.min_stock_level !== undefined ? createInventoryDto.min_stock_level : existing.min_stock_level;
      existing.location = createInventoryDto.location !== undefined ? createInventoryDto.location : existing.location;
      
      const updated = await this.inventoryRepository.save(existing);
      console.log(`✅ [InventoryService] Inventory updated with ID: ${updated.id}`);
      return this.findOne(updated.id);
    }
    
    try {
      const inventory = this.inventoryRepository.create({
        store_id: createInventoryDto.store_id,
        part_id: createInventoryDto.part_id,
        quantity: createInventoryDto.quantity || 0,
        min_stock_level: createInventoryDto.min_stock_level || 0,
        location: createInventoryDto.location || null,
      });
      
      const savedInventory = await this.inventoryRepository.save(inventory);
      console.log(`✅ [InventoryService] Inventory created with ID: ${savedInventory.id}`);
      
      return this.findOne(savedInventory.id);
    } catch (error) {
      console.error('❌ [InventoryService] Error creating inventory:', error);
      throw error;
    }
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    console.log(`📦 [InventoryService] Updating inventory with ID: ${id}`);
    
    const inventory = await this.findOne(id);
    
    Object.assign(inventory, updateInventoryDto);
    const updatedInventory = await this.inventoryRepository.save(inventory);
    console.log(`✅ [InventoryService] Inventory updated: ${updatedInventory.id}`);
    
    return this.findOne(updatedInventory.id);
  }

  async recordTransaction(transactionDto: InventoryTransactionDto): Promise<{ inventory: Inventory; ledger: InventoryLedger }> {
    console.log('📦 [InventoryService] Recording inventory transaction');
    
    return await this.dataSource.transaction(async (manager) => {
      // Find or create inventory record
      let inventory = await manager.findOne(Inventory, {
        where: {
          store_id: transactionDto.store_id,
          part_id: transactionDto.part_id,
        },
      });

      const previousQuantity = inventory ? inventory.quantity : 0;
      let newQuantity = previousQuantity;

      // Calculate new quantity based on transaction type
      switch (transactionDto.transaction_type) {
        case TransactionType.IN:
        case TransactionType.TRANSFER_IN:
          newQuantity = previousQuantity + transactionDto.quantity;
          break;
        case TransactionType.OUT:
        case TransactionType.TRANSFER_OUT:
          newQuantity = Math.max(0, previousQuantity - transactionDto.quantity);
          break;
        case TransactionType.ADJUSTMENT:
          newQuantity = transactionDto.quantity;
          break;
      }

      // Create or update inventory record
      if (!inventory) {
        inventory = manager.create(Inventory, {
          store_id: transactionDto.store_id,
          part_id: transactionDto.part_id,
          quantity: newQuantity,
        });
      } else {
        inventory.quantity = newQuantity;
      }

      const savedInventory = await manager.save(Inventory, inventory);

      // Create ledger entry
      const ledger = manager.create(InventoryLedger, {
        inventory_id: savedInventory.id,
        store_id: transactionDto.store_id,
        part_id: transactionDto.part_id,
        transaction_type: transactionDto.transaction_type,
        quantity: transactionDto.quantity,
        previous_quantity: previousQuantity,
        new_quantity: newQuantity,
        reference_number: transactionDto.reference_number || null,
        notes: transactionDto.notes || null,
        created_by: transactionDto.created_by || null,
      });

      const savedLedger = await manager.save(InventoryLedger, ledger);

      console.log(`✅ [InventoryService] Transaction recorded: ${transactionDto.transaction_type} ${transactionDto.quantity} units`);

      // Read back through the same transactional manager — the outer
      // transaction hasn't committed yet, so a query through the plain
      // repository (a separate connection) wouldn't see this row yet.
      const inventoryWithRelations = await manager.findOne(Inventory, {
        where: { id: savedInventory.id },
        relations: ['store', 'part'],
      });

      return {
        inventory: inventoryWithRelations!,
        ledger: savedLedger,
      };
    });
  }

  async findLedgerByPart(partId: number): Promise<InventoryLedger[]> {
    return this.inventoryLedgerRepository.find({
      where: { part_id: partId },
      relations: ['store'],
      order: { created_at: 'DESC' },
    });
  }

  async findLedger(): Promise<InventoryLedger[]> {
    return this.inventoryLedgerRepository.find({
      relations: ['store', 'part'],
      order: { created_at: 'DESC' },
      take: 500,
    });
  }

  async remove(id: number): Promise<void> {
    console.log(`📦 [InventoryService] Deleting inventory with ID: ${id}`);
    
    const inventory = await this.findOne(id);
    await this.inventoryRepository.remove(inventory);
    console.log(`✅ [InventoryService] Inventory deleted: ${inventory.id}`);
  }

  async getInventoryByStore(): Promise<any[]> {
    console.log('📦 [InventoryService] Getting inventory grouped by store');
    
    const inventory = await this.inventoryRepository.find({
      relations: ['store', 'part'],
      order: {
        store_id: 'ASC',
        part_id: 'ASC',
      },
    });
    
    // Group by store
    const groupedByStore: { [key: number]: any[] } = {};
    
    inventory.forEach((inv) => {
      if (!groupedByStore[inv.store_id]) {
        groupedByStore[inv.store_id] = [];
      }
      groupedByStore[inv.store_id].push(inv);
    });
    
    return Object.values(groupedByStore).flat();
  }
}

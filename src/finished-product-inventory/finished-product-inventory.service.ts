import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { FinishedProductStoreInventory } from '../entities/finished-product-store-inventory.entity';
import { FinishedProductInventoryLedger, FinishedProductLedgerTransactionType } from '../entities/finished-product-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class FinishedProductInventoryService {
  constructor(
    @InjectRepository(FinishedProductStoreInventory)
    private inventoryRepository: Repository<FinishedProductStoreInventory>,
    @InjectRepository(FinishedProductInventoryLedger)
    private ledgerRepository: Repository<FinishedProductInventoryLedger>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    @InjectRepository(FinishedProduct)
    private productRepository: Repository<FinishedProduct>,
    private dataSource: DataSource,
  ) {}

  async findAllInventory(): Promise<FinishedProductStoreInventory[]> {
    return this.inventoryRepository.find({
      relations: ['store', 'product'],
      order: { id: 'ASC' },
    });
  }

  async findLedger(productId?: number): Promise<FinishedProductInventoryLedger[]> {
    return this.ledgerRepository.find({
      where: productId != null ? { productId } : {},
      relations: ['store', 'product'],
      order: { createdAt: 'DESC' },
    });
  }

  // Applies one inventory movement at one store: upserts the balance and writes
  // the matching ledger line. Shared by adjustments, quantity corrections, and
  // both legs of a transfer.
  private async applyMovement(
    manager: EntityManager,
    storeId: number,
    productId: number,
    transactionType: FinishedProductLedgerTransactionType,
    quantity: number,
    newQuantity: number,
    notes: string | null,
    createdBy: number,
  ): Promise<number> {
    let inventory = await manager.findOne(FinishedProductStoreInventory, { where: { storeId, productId } });
    const previousQuantity = inventory ? Number(inventory.quantity) : 0;

    if (!inventory) {
      inventory = manager.create(FinishedProductStoreInventory, { storeId, productId, quantity: newQuantity });
    } else {
      inventory.quantity = newQuantity;
    }
    await manager.save(FinishedProductStoreInventory, inventory);

    const ledgerEntry = manager.create(FinishedProductInventoryLedger, {
      storeId,
      productId,
      transactionType,
      quantity,
      previousQuantity,
      newQuantity,
      notes,
      createdBy,
    });
    const saved = await manager.save(FinishedProductInventoryLedger, ledgerEntry);
    return saved.id;
  }

  async createAdjustment(dto: CreateAdjustmentDto, createdBy: number): Promise<FinishedProductInventoryLedger> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }
    const product = await this.productRepository.findOne({ where: { id: dto.productId } });
    if (!product) {
      throw new NotFoundException(`Finished product with ID ${dto.productId} not found`);
    }

    const ledgerId = await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(FinishedProductStoreInventory, {
        where: { storeId: dto.storeId, productId: dto.productId },
      });
      const previousQuantity = inventory ? Number(inventory.quantity) : 0;
      const newQuantity = dto.direction === 'in' ? previousQuantity + dto.quantity : previousQuantity - dto.quantity;

      if (newQuantity < 0) {
        throw new BadRequestException(
          `Cannot remove ${dto.quantity} — only ${previousQuantity} in stock at ${store.name}`,
        );
      }

      return this.applyMovement(
        manager,
        dto.storeId,
        dto.productId,
        dto.direction === 'in' ? 'adjustment_in' : 'adjustment_out',
        dto.quantity,
        newQuantity,
        dto.notes ?? null,
        createdBy,
      );
    });

    return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'product'] }) as Promise<FinishedProductInventoryLedger>;
  }

  // Sets the store's balance to an exact counted quantity, logging the delta as
  // an adjustment (in if the count is higher than the book balance, out if lower).
  async setQuantity(dto: SetQuantityDto, createdBy: number): Promise<FinishedProductInventoryLedger> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }
    const product = await this.productRepository.findOne({ where: { id: dto.productId } });
    if (!product) {
      throw new NotFoundException(`Finished product with ID ${dto.productId} not found`);
    }

    const ledgerId = await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(FinishedProductStoreInventory, {
        where: { storeId: dto.storeId, productId: dto.productId },
      });
      const previousQuantity = inventory ? Number(inventory.quantity) : 0;
      const delta = dto.quantity - previousQuantity;

      if (delta === 0) {
        throw new BadRequestException('New quantity matches the current balance — nothing to update');
      }

      return this.applyMovement(
        manager,
        dto.storeId,
        dto.productId,
        delta > 0 ? 'adjustment_in' : 'adjustment_out',
        Math.abs(delta),
        dto.quantity,
        dto.notes ?? 'Stock count update',
        createdBy,
      );
    });

    return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'product'] }) as Promise<FinishedProductInventoryLedger>;
  }

  async transfer(dto: TransferDto, createdBy: number): Promise<{ from: FinishedProductInventoryLedger; to: FinishedProductInventoryLedger }> {
    if (dto.fromStoreId === dto.toStoreId) {
      throw new BadRequestException('Source and destination stores must be different');
    }
    const [fromStore, toStore, product] = await Promise.all([
      this.storeRepository.findOne({ where: { id: dto.fromStoreId } }),
      this.storeRepository.findOne({ where: { id: dto.toStoreId } }),
      this.productRepository.findOne({ where: { id: dto.productId } }),
    ]);
    if (!fromStore) {
      throw new NotFoundException(`Store with ID ${dto.fromStoreId} not found`);
    }
    if (!toStore) {
      throw new NotFoundException(`Store with ID ${dto.toStoreId} not found`);
    }
    if (!product) {
      throw new NotFoundException(`Finished product with ID ${dto.productId} not found`);
    }

    const { fromLedgerId, toLedgerId } = await this.dataSource.transaction(async (manager) => {
      const fromInventory = await manager.findOne(FinishedProductStoreInventory, {
        where: { storeId: dto.fromStoreId, productId: dto.productId },
      });
      const fromPrevious = fromInventory ? Number(fromInventory.quantity) : 0;
      if (fromPrevious < dto.quantity) {
        throw new BadRequestException(
          `Cannot transfer ${dto.quantity} — only ${fromPrevious} in stock at ${fromStore.name}`,
        );
      }

      const fromLedgerId = await this.applyMovement(
        manager,
        dto.fromStoreId,
        dto.productId,
        'transfer_out',
        dto.quantity,
        fromPrevious - dto.quantity,
        dto.notes ? `${dto.notes} (to ${toStore.name})` : `Transferred to ${toStore.name}`,
        createdBy,
      );

      const toInventory = await manager.findOne(FinishedProductStoreInventory, {
        where: { storeId: dto.toStoreId, productId: dto.productId },
      });
      const toPrevious = toInventory ? Number(toInventory.quantity) : 0;

      const toLedgerId = await this.applyMovement(
        manager,
        dto.toStoreId,
        dto.productId,
        'transfer_in',
        dto.quantity,
        toPrevious + dto.quantity,
        dto.notes ? `${dto.notes} (from ${fromStore.name})` : `Transferred from ${fromStore.name}`,
        createdBy,
      );

      return { fromLedgerId, toLedgerId };
    });

    const [from, to] = await Promise.all([
      this.ledgerRepository.findOne({ where: { id: fromLedgerId }, relations: ['store', 'product'] }),
      this.ledgerRepository.findOne({ where: { id: toLedgerId }, relations: ['store', 'product'] }),
    ]);
    return { from: from!, to: to! };
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger, SparePartLedgerTransactionType } from '../entities/spare-part-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class SparePartInventoryService {
  constructor(
    @InjectRepository(SparePartStoreInventory)
    private inventoryRepository: Repository<SparePartStoreInventory>,
    @InjectRepository(SparePartInventoryLedger)
    private ledgerRepository: Repository<SparePartInventoryLedger>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
    private dataSource: DataSource,
  ) {}

  async findAllInventory(): Promise<SparePartStoreInventory[]> {
    return this.inventoryRepository.find({
      relations: ['store', 'sparePart'],
      order: { id: 'ASC' },
    });
  }

  async findLedger(sparePartId?: number): Promise<SparePartInventoryLedger[]> {
    return this.ledgerRepository.find({
      where: sparePartId != null ? { sparePartId } : {},
      relations: ['store', 'sparePart'],
      order: { createdAt: 'DESC' },
    });
  }

  // Applies one inventory movement at one store: upserts the balance and writes
  // the matching ledger line. Shared by adjustments, quantity corrections, and
  // both legs of a transfer.
  private async applyMovement(
    manager: EntityManager,
    storeId: number,
    sparePartId: number,
    transactionType: SparePartLedgerTransactionType,
    quantity: number,
    newQuantity: number,
    notes: string | null,
    createdBy: number,
  ): Promise<number> {
    let inventory = await manager.findOne(SparePartStoreInventory, { where: { storeId, sparePartId } });
    const previousQuantity = inventory ? Number(inventory.quantity) : 0;

    if (!inventory) {
      inventory = manager.create(SparePartStoreInventory, { storeId, sparePartId, quantity: newQuantity });
    } else {
      inventory.quantity = newQuantity;
    }
    await manager.save(SparePartStoreInventory, inventory);

    const ledgerEntry = manager.create(SparePartInventoryLedger, {
      storeId,
      sparePartId,
      transactionType,
      quantity,
      previousQuantity,
      newQuantity,
      notes,
      createdBy,
    });
    const saved = await manager.save(SparePartInventoryLedger, ledgerEntry);
    return saved.id;
  }

  async createAdjustment(dto: CreateAdjustmentDto, createdBy: number): Promise<SparePartInventoryLedger> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }
    const sparePart = await this.sparePartRepository.findOne({ where: { id: dto.sparePartId } });
    if (!sparePart) {
      throw new NotFoundException(`Spare part with ID ${dto.sparePartId} not found`);
    }

    const ledgerId = await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(SparePartStoreInventory, {
        where: { storeId: dto.storeId, sparePartId: dto.sparePartId },
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
        dto.sparePartId,
        dto.direction === 'in' ? 'adjustment_in' : 'adjustment_out',
        dto.quantity,
        newQuantity,
        dto.notes ?? null,
        createdBy,
      );
    });

    return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'sparePart'] }) as Promise<SparePartInventoryLedger>;
  }

  // Sets the store's balance to an exact counted quantity, logging the delta as
  // an adjustment (in if the count is higher than the book balance, out if lower).
  async setQuantity(dto: SetQuantityDto, createdBy: number): Promise<SparePartInventoryLedger> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }
    const sparePart = await this.sparePartRepository.findOne({ where: { id: dto.sparePartId } });
    if (!sparePart) {
      throw new NotFoundException(`Spare part with ID ${dto.sparePartId} not found`);
    }

    const ledgerId = await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(SparePartStoreInventory, {
        where: { storeId: dto.storeId, sparePartId: dto.sparePartId },
      });
      const previousQuantity = inventory ? Number(inventory.quantity) : 0;
      const delta = dto.quantity - previousQuantity;

      if (delta === 0) {
        throw new BadRequestException('New quantity matches the current balance — nothing to update');
      }

      return this.applyMovement(
        manager,
        dto.storeId,
        dto.sparePartId,
        delta > 0 ? 'adjustment_in' : 'adjustment_out',
        Math.abs(delta),
        dto.quantity,
        dto.notes ?? 'Stock count update',
        createdBy,
      );
    });

    return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'sparePart'] }) as Promise<SparePartInventoryLedger>;
  }

  async transfer(dto: TransferDto, createdBy: number): Promise<{ from: SparePartInventoryLedger; to: SparePartInventoryLedger }> {
    if (dto.fromStoreId === dto.toStoreId) {
      throw new BadRequestException('Source and destination stores must be different');
    }
    const [fromStore, toStore, sparePart] = await Promise.all([
      this.storeRepository.findOne({ where: { id: dto.fromStoreId } }),
      this.storeRepository.findOne({ where: { id: dto.toStoreId } }),
      this.sparePartRepository.findOne({ where: { id: dto.sparePartId } }),
    ]);
    if (!fromStore) {
      throw new NotFoundException(`Store with ID ${dto.fromStoreId} not found`);
    }
    if (!toStore) {
      throw new NotFoundException(`Store with ID ${dto.toStoreId} not found`);
    }
    if (!sparePart) {
      throw new NotFoundException(`Spare part with ID ${dto.sparePartId} not found`);
    }

    const { fromLedgerId, toLedgerId } = await this.dataSource.transaction(async (manager) => {
      const fromInventory = await manager.findOne(SparePartStoreInventory, {
        where: { storeId: dto.fromStoreId, sparePartId: dto.sparePartId },
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
        dto.sparePartId,
        'transfer_out',
        dto.quantity,
        fromPrevious - dto.quantity,
        dto.notes ? `${dto.notes} (to ${toStore.name})` : `Transferred to ${toStore.name}`,
        createdBy,
      );

      const toInventory = await manager.findOne(SparePartStoreInventory, {
        where: { storeId: dto.toStoreId, sparePartId: dto.sparePartId },
      });
      const toPrevious = toInventory ? Number(toInventory.quantity) : 0;

      const toLedgerId = await this.applyMovement(
        manager,
        dto.toStoreId,
        dto.sparePartId,
        'transfer_in',
        dto.quantity,
        toPrevious + dto.quantity,
        dto.notes ? `${dto.notes} (from ${fromStore.name})` : `Transferred from ${fromStore.name}`,
        createdBy,
      );

      return { fromLedgerId, toLedgerId };
    });

    const [from, to] = await Promise.all([
      this.ledgerRepository.findOne({ where: { id: fromLedgerId }, relations: ['store', 'sparePart'] }),
      this.ledgerRepository.findOne({ where: { id: toLedgerId }, relations: ['store', 'sparePart'] }),
    ]);
    return { from: from!, to: to! };
  }
}

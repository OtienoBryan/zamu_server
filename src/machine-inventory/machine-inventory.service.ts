import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { MachineStoreInventory } from '../entities/machine-store-inventory.entity';
import { MachineInventoryLedger, MachineLedgerTransactionType } from '../entities/machine-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { Machine } from '../entities/machine.entity';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class MachineInventoryService {
  constructor(
    @InjectRepository(MachineStoreInventory)
    private inventoryRepository: Repository<MachineStoreInventory>,
    @InjectRepository(MachineInventoryLedger)
    private ledgerRepository: Repository<MachineInventoryLedger>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    @InjectRepository(Machine)
    private machineRepository: Repository<Machine>,
    private dataSource: DataSource,
  ) {}

  async findAllInventory(): Promise<MachineStoreInventory[]> {
    return this.inventoryRepository.find({
      relations: ['store', 'machine'],
      order: { id: 'ASC' },
    });
  }

  async findLedger(machineId?: number): Promise<MachineInventoryLedger[]> {
    return this.ledgerRepository.find({
      where: machineId != null ? { machineId } : {},
      relations: ['store', 'machine'],
      order: { createdAt: 'DESC' },
    });
  }

  // Applies one inventory movement at one store: upserts the balance and writes
  // the matching ledger line. Shared by adjustments, quantity corrections, and
  // both legs of a transfer.
  private async applyMovement(
    manager: EntityManager,
    storeId: number,
    machineId: number,
    transactionType: MachineLedgerTransactionType,
    quantity: number,
    newQuantity: number,
    notes: string | null,
    createdBy: number,
  ): Promise<number> {
    let inventory = await manager.findOne(MachineStoreInventory, { where: { storeId, machineId } });
    const previousQuantity = inventory ? Number(inventory.quantity) : 0;

    if (!inventory) {
      inventory = manager.create(MachineStoreInventory, { storeId, machineId, quantity: newQuantity });
    } else {
      inventory.quantity = newQuantity;
    }
    await manager.save(MachineStoreInventory, inventory);

    const ledgerEntry = manager.create(MachineInventoryLedger, {
      storeId,
      machineId,
      transactionType,
      quantity,
      previousQuantity,
      newQuantity,
      notes,
      createdBy,
    });
    const saved = await manager.save(MachineInventoryLedger, ledgerEntry);
    return saved.id;
  }

  async createAdjustment(dto: CreateAdjustmentDto, createdBy: number): Promise<MachineInventoryLedger> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }
    const machine = await this.machineRepository.findOne({ where: { id: dto.machineId } });
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${dto.machineId} not found`);
    }

    const ledgerId = await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(MachineStoreInventory, {
        where: { storeId: dto.storeId, machineId: dto.machineId },
      });
      const previousQuantity = inventory ? Number(inventory.quantity) : 0;
      const newQuantity = dto.direction === 'in' ? previousQuantity + dto.quantity : previousQuantity - dto.quantity;

      if (newQuantity < 0) {
        throw new BadRequestException(
          `Cannot remove ${dto.quantity} — only ${previousQuantity} at ${store.name}`,
        );
      }

      return this.applyMovement(
        manager,
        dto.storeId,
        dto.machineId,
        dto.direction === 'in' ? 'adjustment_in' : 'adjustment_out',
        dto.quantity,
        newQuantity,
        dto.notes ?? null,
        createdBy,
      );
    });

    return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'machine'] }) as Promise<MachineInventoryLedger>;
  }

  // Sets the store's balance to an exact counted quantity, logging the delta as
  // an adjustment (in if the count is higher than the book balance, out if lower).
  async setQuantity(dto: SetQuantityDto, createdBy: number): Promise<MachineInventoryLedger> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }
    const machine = await this.machineRepository.findOne({ where: { id: dto.machineId } });
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${dto.machineId} not found`);
    }

    const ledgerId = await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(MachineStoreInventory, {
        where: { storeId: dto.storeId, machineId: dto.machineId },
      });
      const previousQuantity = inventory ? Number(inventory.quantity) : 0;
      const delta = dto.quantity - previousQuantity;

      if (delta === 0) {
        throw new BadRequestException('New quantity matches the current balance — nothing to update');
      }

      return this.applyMovement(
        manager,
        dto.storeId,
        dto.machineId,
        delta > 0 ? 'adjustment_in' : 'adjustment_out',
        Math.abs(delta),
        dto.quantity,
        dto.notes ?? 'Stock count update',
        createdBy,
      );
    });

    return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'machine'] }) as Promise<MachineInventoryLedger>;
  }

  async transfer(dto: TransferDto, createdBy: number): Promise<{ from: MachineInventoryLedger; to: MachineInventoryLedger }> {
    if (dto.fromStoreId === dto.toStoreId) {
      throw new BadRequestException('Source and destination stores must be different');
    }
    const [fromStore, toStore, machine] = await Promise.all([
      this.storeRepository.findOne({ where: { id: dto.fromStoreId } }),
      this.storeRepository.findOne({ where: { id: dto.toStoreId } }),
      this.machineRepository.findOne({ where: { id: dto.machineId } }),
    ]);
    if (!fromStore) {
      throw new NotFoundException(`Store with ID ${dto.fromStoreId} not found`);
    }
    if (!toStore) {
      throw new NotFoundException(`Store with ID ${dto.toStoreId} not found`);
    }
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${dto.machineId} not found`);
    }

    const { fromLedgerId, toLedgerId } = await this.dataSource.transaction(async (manager) => {
      const fromInventory = await manager.findOne(MachineStoreInventory, {
        where: { storeId: dto.fromStoreId, machineId: dto.machineId },
      });
      const fromPrevious = fromInventory ? Number(fromInventory.quantity) : 0;
      if (fromPrevious < dto.quantity) {
        throw new BadRequestException(
          `Cannot transfer ${dto.quantity} — only ${fromPrevious} at ${fromStore.name}`,
        );
      }

      const fromLedgerId = await this.applyMovement(
        manager,
        dto.fromStoreId,
        dto.machineId,
        'transfer_out',
        dto.quantity,
        fromPrevious - dto.quantity,
        dto.notes ? `${dto.notes} (to ${toStore.name})` : `Transferred to ${toStore.name}`,
        createdBy,
      );

      const toInventory = await manager.findOne(MachineStoreInventory, {
        where: { storeId: dto.toStoreId, machineId: dto.machineId },
      });
      const toPrevious = toInventory ? Number(toInventory.quantity) : 0;

      const toLedgerId = await this.applyMovement(
        manager,
        dto.toStoreId,
        dto.machineId,
        'transfer_in',
        dto.quantity,
        toPrevious + dto.quantity,
        dto.notes ? `${dto.notes} (from ${fromStore.name})` : `Transferred from ${fromStore.name}`,
        createdBy,
      );

      return { fromLedgerId, toLedgerId };
    });

    const [from, to] = await Promise.all([
      this.ledgerRepository.findOne({ where: { id: fromLedgerId }, relations: ['store', 'machine'] }),
      this.ledgerRepository.findOne({ where: { id: toLedgerId }, relations: ['store', 'machine'] }),
    ]);
    return { from: from!, to: to! };
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WorkOrderWasteEntry, WorkOrderWasteType } from '../entities/work-order-waste.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';
import { CreateWorkOrderWasteDto } from './dto/create-work-order-waste.dto';

const RELATIONS = ['workOrder', 'workOrder.product', 'workOrder.stage', 'rawMaterial', 'store'];

@Injectable()
export class WorkOrderWasteService {
  constructor(
    @InjectRepository(WorkOrderWasteEntry)
    private wasteRepository: Repository<WorkOrderWasteEntry>,
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    private dataSource: DataSource,
  ) {}

  async findForWorkOrder(workOrderId: number): Promise<WorkOrderWasteEntry[]> {
    return this.wasteRepository.find({
      where: { workOrderId },
      relations: RELATIONS,
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(type?: WorkOrderWasteType): Promise<WorkOrderWasteEntry[]> {
    return this.wasteRepository.find({
      where: type ? { type } : {},
      relations: RELATIONS,
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateWorkOrderWasteDto): Promise<WorkOrderWasteEntry> {
    const workOrder = await this.workOrderRepository.findOne({
      where: { id: dto.workOrderId },
      relations: ['materials'],
    });
    if (!workOrder) {
      throw new NotFoundException(`Production order with ID ${dto.workOrderId} not found`);
    }
    if (workOrder.status === 'cancelled') {
      throw new BadRequestException('Cannot record waste for a cancelled production order');
    }

    const usedMaterialIds = new Set((workOrder.materials || []).map((m) => m.rawMaterialId));
    if (!usedMaterialIds.has(dto.rawMaterialId)) {
      throw new BadRequestException('This raw material is not part of the materials selected for this production order');
    }

    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }

    // Damages are always a loss; only an offcut can be marked reusable.
    const reusable = dto.type === 'offcut' && dto.reusable === true;
    const stockAction: 'returned' | 'deducted' = reusable ? 'returned' : 'deducted';
    const quantity = dto.quantity;

    const savedId = await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(RawMaterialStoreInventory, {
        where: { storeId: dto.storeId, rawMaterialId: dto.rawMaterialId },
      });
      const previousQuantity = inventory ? Number(inventory.quantity) : 0;
      const newQuantity = stockAction === 'returned' ? previousQuantity + quantity : previousQuantity - quantity;

      if (stockAction === 'deducted' && newQuantity < 0) {
        throw new BadRequestException(
          `Not enough stock of this raw material at ${store.name} to record this loss (have ${previousQuantity}, need ${quantity})`,
        );
      }

      if (inventory) {
        await manager.update(RawMaterialStoreInventory, { storeId: dto.storeId, rawMaterialId: dto.rawMaterialId }, { quantity: newQuantity });
      } else {
        await manager.save(
          RawMaterialStoreInventory,
          manager.create(RawMaterialStoreInventory, { storeId: dto.storeId, rawMaterialId: dto.rawMaterialId, quantity: newQuantity }),
        );
      }

      const label = dto.type === 'offcut' ? (reusable ? 'Reusable offcut returned to stock' : 'Unusable offcut written off') : 'Damage written off';
      const ledgerEntry = manager.create(RawMaterialInventoryLedger, {
        storeId: dto.storeId,
        rawMaterialId: dto.rawMaterialId,
        transactionType: 'adjustment',
        quantity,
        previousQuantity,
        newQuantity,
        notes: `${label} — Production Order #${workOrder.id} (${workOrder.description})${dto.notes ? `: ${dto.notes}` : ''}`,
      });
      await manager.save(RawMaterialInventoryLedger, ledgerEntry);

      const entry = manager.create(WorkOrderWasteEntry, {
        workOrderId: dto.workOrderId,
        rawMaterialId: dto.rawMaterialId,
        storeId: dto.storeId,
        type: dto.type,
        reusable,
        quantity,
        stockAction,
        notes: dto.notes ?? null,
      });
      const saved = await manager.save(WorkOrderWasteEntry, entry);
      return saved.id;
    });

    return this.wasteRepository.findOne({ where: { id: savedId }, relations: RELATIONS }) as Promise<WorkOrderWasteEntry>;
  }

  async remove(id: number): Promise<void> {
    const entry = await this.wasteRepository.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException(`Waste entry with ID ${id} not found`);
    }

    await this.dataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(RawMaterialStoreInventory, {
        where: { storeId: entry.storeId, rawMaterialId: entry.rawMaterialId },
      });
      const previousQuantity = inventory ? Number(inventory.quantity) : 0;
      // Reverse whatever this entry did to stock.
      const newQuantity = entry.stockAction === 'returned' ? previousQuantity - Number(entry.quantity) : previousQuantity + Number(entry.quantity);

      if (inventory) {
        await manager.update(RawMaterialStoreInventory, { storeId: entry.storeId, rawMaterialId: entry.rawMaterialId }, { quantity: newQuantity });
      } else {
        await manager.save(
          RawMaterialStoreInventory,
          manager.create(RawMaterialStoreInventory, { storeId: entry.storeId, rawMaterialId: entry.rawMaterialId, quantity: newQuantity }),
        );
      }

      const ledgerEntry = manager.create(RawMaterialInventoryLedger, {
        storeId: entry.storeId,
        rawMaterialId: entry.rawMaterialId,
        transactionType: 'adjustment',
        quantity: Number(entry.quantity),
        previousQuantity,
        newQuantity,
        notes: `Reversal of ${entry.type} waste entry #${entry.id} on Production Order #${entry.workOrderId}`,
      });
      await manager.save(RawMaterialInventoryLedger, ledgerEntry);

      await manager.remove(WorkOrderWasteEntry, entry);
    });
  }
}

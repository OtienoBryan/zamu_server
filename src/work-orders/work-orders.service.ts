import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { WorkOrder } from '../entities/work-order.entity';
import { WorkOrderStaff } from '../entities/work-order-staff.entity';
import { WorkOrderMaterial } from '../entities/work-order-material.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { ProductionStage } from '../entities/production-stage.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';
import { CreateWorkOrderDto, WorkOrderMaterialDto } from './dto/create-work-order.dto';
import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { ConfirmWorkOrderDto } from './dto/confirm-work-order.dto';

const RELATIONS = ['product', 'stage', 'staff', 'assignedStaff', 'assignedStaff.staffMember', 'materials', 'materials.rawMaterial'];

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(FinishedProduct)
    private productRepository: Repository<FinishedProduct>,
    @InjectRepository(FinishedProductMaterial)
    private materialRepository: Repository<FinishedProductMaterial>,
    @InjectRepository(ProductionStage)
    private stageRepository: Repository<ProductionStage>,
    @InjectRepository(StaffMember)
    private staffRepository: Repository<StaffMember>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<WorkOrder[]> {
    return this.workOrderRepository.find({
      relations: RELATIONS,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findOne({
      where: { id },
      relations: RELATIONS,
    });
    if (!workOrder) {
      throw new NotFoundException(`Work order with ID ${id} not found`);
    }
    return workOrder;
  }

  async create(dto: CreateWorkOrderDto): Promise<WorkOrder> {
    if (dto.status === 'completed') {
      throw new BadRequestException('A production order can only be marked completed via the Confirm Work flow');
    }
    await this.ensureReferencesExist(dto.productId, dto.stageId, dto.staffIds);
    await this.ensureMaterialsInBom(dto.productId, dto.materials);
    const staffIds = Array.from(new Set(dto.staffIds));
    const materials = this.dedupeMaterials(dto.materials ?? []);

    const savedId = await this.dataSource.transaction(async (manager) => {
      const workOrder = manager.create(WorkOrder, {
        description: dto.description,
        productId: dto.productId,
        stageId: dto.stageId,
        staffId: staffIds[0],
        date: dto.date,
        targetQuantity: dto.targetQuantity,
        status: dto.status ?? 'pending',
      });
      const saved = await manager.save(WorkOrder, workOrder);

      for (const staffMemberId of staffIds) {
        await manager.save(WorkOrderStaff, manager.create(WorkOrderStaff, { workOrderId: saved.id, staffMemberId }));
      }

      for (const m of materials) {
        await manager.save(WorkOrderMaterial, manager.create(WorkOrderMaterial, {
          workOrderId: saved.id,
          rawMaterialId: m.rawMaterialId,
          quantity: m.quantity,
        }));
      }

      return saved.id;
    });

    return this.findOne(savedId);
  }

  async update(id: number, dto: UpdateWorkOrderDto): Promise<WorkOrder> {
    const existing = await this.findOne(id);
    if (dto.status === 'completed' && existing.status !== 'completed') {
      throw new BadRequestException('A production order can only be marked completed via the Confirm Work flow');
    }
    await this.ensureReferencesExist(dto.productId, dto.stageId, dto.staffIds);
    await this.ensureMaterialsInBom(dto.productId ?? existing.productId, dto.materials);
    const staffIds = dto.staffIds ? Array.from(new Set(dto.staffIds)) : undefined;
    const materials = dto.materials ? this.dedupeMaterials(dto.materials) : undefined;

    await this.dataSource.transaction(async (manager) => {
      const { staffIds: _omitStaff, materials: _omitMaterials, ...columns } = dto;
      await manager.update(WorkOrder, id, staffIds ? { ...columns, staffId: staffIds[0] } : columns);

      if (staffIds) {
        await manager.delete(WorkOrderStaff, { workOrderId: id });
        for (const staffMemberId of staffIds) {
          await manager.save(WorkOrderStaff, manager.create(WorkOrderStaff, { workOrderId: id, staffMemberId }));
        }
      }

      if (materials) {
        await manager.delete(WorkOrderMaterial, { workOrderId: id });
        for (const m of materials) {
          await manager.save(WorkOrderMaterial, manager.create(WorkOrderMaterial, {
            workOrderId: id,
            rawMaterialId: m.rawMaterialId,
            quantity: m.quantity,
          }));
        }
      }
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const workOrder = await this.findOne(id);
    await this.workOrderRepository.remove(workOrder);
  }

  async confirmComplete(id: number, dto: ConfirmWorkOrderDto): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    if (workOrder.status === 'completed') {
      throw new ConflictException('This production order is already completed');
    }
    if (workOrder.status === 'cancelled') {
      throw new ConflictException('Cannot complete a cancelled production order');
    }

    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }

    // Deduct exactly what was selected for this order/stage — not the product's
    // full bill of materials, since a single production stage (e.g. cutting)
    // typically only consumes a subset of it.
    const required = workOrder.materials.map((m) => ({
      line: m,
      requiredQuantity: Number(m.quantity),
    }));

    if (required.length > 0) {
      const inventoryRows = await this.dataSource.getRepository(RawMaterialStoreInventory).find({
        where: { storeId: dto.storeId, rawMaterialId: In(required.map((r) => r.line.rawMaterialId)) },
      });
      const availableById = new Map(inventoryRows.map((row) => [row.rawMaterialId, Number(row.quantity)]));

      const shortages = required
        .map((r) => ({
          name: r.line.rawMaterial?.name ?? `#${r.line.rawMaterialId}`,
          required: r.requiredQuantity,
          available: availableById.get(r.line.rawMaterialId) ?? 0,
        }))
        .filter((s) => s.available < s.required);

      if (shortages.length > 0) {
        const detail = shortages.map((s) => `${s.name} (need ${s.required}, have ${s.available})`).join('; ');
        throw new BadRequestException(`Not enough raw material stock at ${store.name} to complete this order: ${detail}`);
      }
    }

    await this.dataSource.transaction(async (manager) => {
      for (const r of required) {
        const inventory = await manager.findOne(RawMaterialStoreInventory, {
          where: { storeId: dto.storeId, rawMaterialId: r.line.rawMaterialId },
        });
        const previousQuantity = inventory ? Number(inventory.quantity) : 0;
        const newQuantity = previousQuantity - r.requiredQuantity;

        await manager.update(
          RawMaterialStoreInventory,
          { storeId: dto.storeId, rawMaterialId: r.line.rawMaterialId },
          { quantity: newQuantity },
        );

        const ledgerEntry = manager.create(RawMaterialInventoryLedger, {
          storeId: dto.storeId,
          rawMaterialId: r.line.rawMaterialId,
          transactionType: 'production_use',
          quantity: r.requiredQuantity,
          previousQuantity,
          newQuantity,
          notes: `Used to complete Production Order #${workOrder.id} (${workOrder.description})`,
        });
        await manager.save(RawMaterialInventoryLedger, ledgerEntry);
      }

      await manager.update(WorkOrder, id, { status: 'completed' });
    });

    return this.findOne(id);
  }

  private async ensureReferencesExist(productId?: number, stageId?: number, staffIds?: number[]): Promise<void> {
    if (productId != null) {
      const product = await this.productRepository.findOne({ where: { id: productId } });
      if (!product) throw new NotFoundException(`Finished product with ID ${productId} not found`);
    }
    if (stageId != null) {
      const stage = await this.stageRepository.findOne({ where: { id: stageId } });
      if (!stage) throw new NotFoundException(`Production stage with ID ${stageId} not found`);
    }
    if (staffIds != null && staffIds.length > 0) {
      const found = await this.staffRepository.find({ where: { id: In(staffIds) } });
      const foundIds = new Set(found.map((s) => s.id));
      const missing = staffIds.filter((id) => !foundIds.has(id));
      if (missing.length > 0) throw new NotFoundException(`Staff member(s) with ID ${missing.join(', ')} not found`);
    }
  }

  // The material picker is scoped to the product's own bill of materials, so
  // reject anything outside it rather than silently allowing arbitrary materials.
  private async ensureMaterialsInBom(productId: number, materials?: WorkOrderMaterialDto[]): Promise<void> {
    if (!materials || materials.length === 0) return;
    const bom = await this.materialRepository.find({ where: { finishedProductId: productId } });
    const bomIds = new Set(bom.map((line) => line.rawMaterialId));
    const invalid = materials.filter((m) => !bomIds.has(m.rawMaterialId));
    if (invalid.length > 0) {
      throw new BadRequestException(
        `Raw material(s) ${invalid.map((m) => m.rawMaterialId).join(', ')} are not part of this product's bill of materials`,
      );
    }
  }

  private dedupeMaterials(materials: WorkOrderMaterialDto[]): WorkOrderMaterialDto[] {
    const byId = new Map<number, number>();
    for (const m of materials) {
      byId.set(m.rawMaterialId, (byId.get(m.rawMaterialId) ?? 0) + m.quantity);
    }
    return Array.from(byId, ([rawMaterialId, quantity]) => ({ rawMaterialId, quantity }));
  }
}

import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { SparePartRequest } from '../entities/spare-part-request.entity';
import { SparePartRequestItem } from '../entities/spare-part-request-item.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { Machine } from '../entities/machine.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateSparePartRequestDto } from './dto/create-spare-part-request.dto';
import { FulfillSparePartRequestDto } from './dto/fulfill-spare-part-request.dto';

const RELATIONS = ['store', 'machine', 'staffMember', 'items', 'items.sparePart'];

@Injectable()
export class SparePartRequestsService {
  constructor(
    @InjectRepository(SparePartRequest)
    private requestRepository: Repository<SparePartRequest>,
    @InjectRepository(SparePartRequestItem)
    private itemRepository: Repository<SparePartRequestItem>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
    @InjectRepository(Machine)
    private machineRepository: Repository<Machine>,
    @InjectRepository(StaffMember)
    private staffMemberRepository: Repository<StaffMember>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<SparePartRequest[]> {
    return this.requestRepository.find({
      relations: RELATIONS,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<SparePartRequest> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: RELATIONS,
    });
    if (!request) {
      throw new NotFoundException(`Spare part request with ID ${id} not found`);
    }
    return request;
  }

  async create(dto: CreateSparePartRequestDto, requestedBy: number): Promise<SparePartRequest> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }

    if (dto.machineId != null) {
      const machine = await this.machineRepository.findOne({ where: { id: dto.machineId } });
      if (!machine) {
        throw new NotFoundException(`Machine with ID ${dto.machineId} not found`);
      }
    }

    if (dto.staffMemberId != null) {
      const staffMember = await this.staffMemberRepository.findOne({ where: { id: dto.staffMemberId } });
      if (!staffMember) {
        throw new NotFoundException(`Staff member with ID ${dto.staffMemberId} not found`);
      }
    }

    const sparePartIds = [...new Set(dto.items.map((i) => i.sparePartId))];
    const sparePartsFound = await this.sparePartRepository.find({ where: { id: In(sparePartIds) } });
    if (sparePartsFound.length !== sparePartIds.length) {
      const foundIds = new Set(sparePartsFound.map((p) => p.id));
      const missing = sparePartIds.filter((id) => !foundIds.has(id));
      throw new NotFoundException(`Spare part(s) not found: ${missing.join(', ')}`);
    }

    const request = this.requestRepository.create({
      storeId: dto.storeId,
      machineId: dto.machineId ?? null,
      staffMemberId: dto.staffMemberId ?? null,
      requestedBy,
      notes: dto.notes ?? null,
      status: 'pending',
      items: dto.items.map((i) =>
        this.itemRepository.create({ sparePartId: i.sparePartId, quantity: i.quantity }),
      ),
    });
    const saved = await this.requestRepository.save(request);
    return this.findOne(saved.id);
  }

  // Fulfilling deducts every requested line from the store's inventory and posts
  // one adjustment_out ledger entry per part, all inside a single transaction so
  // a partial shortfall never leaves stock half-deducted.
  async fulfill(id: number, dto: FulfillSparePartRequestDto, fulfilledBy: number): Promise<SparePartRequest> {
    const request = await this.findOne(id);
    if (request.status !== 'pending') {
      throw new ConflictException(`Request is already ${request.status}`);
    }

    const fulfilledAt = dto.fulfilledAt ? new Date(dto.fulfilledAt) : new Date();
    const fulfillmentNotes = dto.notes?.trim() || null;

    await this.dataSource.transaction(async (manager) => {
      for (const item of request.items) {
        const inventory = await manager.findOne(SparePartStoreInventory, {
          where: { storeId: request.storeId, sparePartId: item.sparePartId },
        });
        const previousQuantity = inventory ? Number(inventory.quantity) : 0;
        const requestedQuantity = Number(item.quantity);
        const newQuantity = previousQuantity - requestedQuantity;

        if (newQuantity < 0) {
          const partName = item.sparePart?.name || `#${item.sparePartId}`;
          throw new BadRequestException(
            `Cannot fulfill — only ${previousQuantity} of "${partName}" in stock at ${request.store?.name || 'this store'} (requested ${requestedQuantity})`,
          );
        }

        if (!inventory) {
          await manager.save(
            SparePartStoreInventory,
            manager.create(SparePartStoreInventory, {
              storeId: request.storeId,
              sparePartId: item.sparePartId,
              quantity: newQuantity,
            }),
          );
        } else {
          inventory.quantity = newQuantity;
          await manager.save(SparePartStoreInventory, inventory);
        }

        await manager.save(
          SparePartInventoryLedger,
          manager.create(SparePartInventoryLedger, {
            storeId: request.storeId,
            sparePartId: item.sparePartId,
            transactionType: 'adjustment_out',
            quantity: requestedQuantity,
            previousQuantity,
            newQuantity,
            notes: fulfillmentNotes ? `Fulfilled request #${request.id}: ${fulfillmentNotes}` : `Fulfilled request #${request.id}`,
            createdBy: fulfilledBy,
          }),
        );
      }

      await manager.update(SparePartRequest, request.id, {
        status: 'fulfilled',
        fulfilledAt,
        fulfillmentNotes,
      });
    });

    return this.findOne(id);
  }

  async cancel(id: number): Promise<SparePartRequest> {
    const request = await this.findOne(id);
    if (request.status !== 'pending') {
      throw new ConflictException(`Request is already ${request.status}`);
    }
    request.status = 'cancelled';
    await this.requestRepository.save(request);
    return this.findOne(id);
  }
}

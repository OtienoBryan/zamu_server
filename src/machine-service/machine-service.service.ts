import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { MachineServiceRecord } from '../entities/machine-service-record.entity';
import { MachineServicePart } from '../entities/machine-service-part.entity';
import { MachineServiceWorker } from '../entities/machine-service-worker.entity';
import { Machine } from '../entities/machine.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateMachineServiceDto } from './dto/create-machine-service.dto';

const RELATIONS = ['machine', 'store', 'parts', 'parts.sparePart', 'workers', 'workers.staffMember'];

@Injectable()
export class MachineServiceService {
  constructor(
    @InjectRepository(MachineServiceRecord)
    private serviceRecordRepository: Repository<MachineServiceRecord>,
    @InjectRepository(Machine)
    private machineRepository: Repository<Machine>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    private dataSource: DataSource,
  ) {}

  async findAll(machineId?: number): Promise<MachineServiceRecord[]> {
    return this.serviceRecordRepository.find({
      where: machineId != null ? { machineId } : {},
      relations: RELATIONS,
      order: { startAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<MachineServiceRecord> {
    const record = await this.serviceRecordRepository.findOne({
      where: { id },
      relations: RELATIONS,
    });
    if (!record) {
      throw new NotFoundException(`Service record with ID ${id} not found`);
    }
    return record;
  }

  async create(dto: CreateMachineServiceDto, createdBy: number): Promise<MachineServiceRecord> {
    const machine = await this.machineRepository.findOne({ where: { id: dto.machineId } });
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${dto.machineId} not found`);
    }

    const startAt = new Date(dto.startAt);
    const endAt = new Date(dto.endAt);
    if (endAt <= startAt) {
      throw new BadRequestException('End date/time must be after the start date/time');
    }

    const parts = dto.parts ?? [];
    const storeId = dto.storeId ?? machine.storeId ?? null;
    if (parts.length > 0 && storeId == null) {
      throw new BadRequestException(
        'A store/location is required to deduct parts used — assign one to the machine or select one for this service',
      );
    }

    let store: RawMaterialStore | null = null;
    if (storeId != null) {
      store = await this.storeRepository.findOne({ where: { id: storeId } });
      if (!store) {
        throw new NotFoundException(`Store with ID ${storeId} not found`);
      }
    }

    const savedId = await this.dataSource.transaction(async (manager) => {
      const record = manager.create(MachineServiceRecord, {
        machineId: dto.machineId,
        storeId,
        startAt,
        endAt,
        description: dto.description,
        createdBy,
      });
      const savedRecord = await manager.save(MachineServiceRecord, record);

      for (const part of parts) {
        const sparePart = await manager.findOne(SparePart, { where: { id: part.sparePartId } });
        if (!sparePart) {
          throw new NotFoundException(`Spare part with ID ${part.sparePartId} not found`);
        }

        const servicePart = manager.create(MachineServicePart, {
          serviceRecordId: savedRecord.id,
          sparePartId: part.sparePartId,
          quantity: part.quantity,
        });
        await manager.save(MachineServicePart, servicePart);

        let inventory = await manager.findOne(SparePartStoreInventory, {
          where: { storeId: storeId!, sparePartId: part.sparePartId },
        });
        const previousQuantity = inventory ? Number(inventory.quantity) : 0;
        const newQuantity = previousQuantity - part.quantity;
        if (newQuantity < 0) {
          throw new BadRequestException(
            `Cannot use ${part.quantity} of "${sparePart.name}" — only ${previousQuantity} in stock at ${store!.name}`,
          );
        }

        if (!inventory) {
          inventory = manager.create(SparePartStoreInventory, { storeId: storeId!, sparePartId: part.sparePartId, quantity: newQuantity });
        } else {
          inventory.quantity = newQuantity;
        }
        await manager.save(SparePartStoreInventory, inventory);

        const ledgerEntry = manager.create(SparePartInventoryLedger, {
          storeId: storeId!,
          sparePartId: part.sparePartId,
          transactionType: 'adjustment_out',
          quantity: part.quantity,
          previousQuantity,
          newQuantity,
          notes: `Used in maintenance for ${machine.name} (Service #${savedRecord.id})`,
          createdBy,
        });
        await manager.save(SparePartInventoryLedger, ledgerEntry);
      }

      const workerIds = Array.from(new Set(dto.workerIds ?? []));
      for (const staffMemberId of workerIds) {
        const staffMember = await manager.findOne(StaffMember, { where: { id: staffMemberId } });
        if (!staffMember) {
          throw new NotFoundException(`Staff member with ID ${staffMemberId} not found`);
        }
        const worker = manager.create(MachineServiceWorker, {
          serviceRecordId: savedRecord.id,
          staffMemberId,
        });
        await manager.save(MachineServiceWorker, worker);
      }

      return savedRecord.id;
    });

    return this.findOne(savedId);
  }
}

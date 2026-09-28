import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobCard } from '../entities/job-card.entity';
import { JobCardItem } from '../entities/job-card-item.entity';
import { CreateJobCardDto } from './dto/create-job-card.dto';
import { UpdateJobCardDto } from './dto/update-job-card.dto';
import { ConvertToInvoiceDto } from './dto/convert-to-invoice.dto';
import { InventoryService } from '../inventory/inventory.service';
import { TransactionType } from '../inventory/dto/inventory-transaction.dto';

const RELATIONS = ['conversionClient', 'conversionVehicle', 'items', 'items.part', 'items.service', 'items.assignedStaff'];

// List views only need totals (from items) and the client/vehicle headline —
// the nested part/staff relations are only needed when opening a single job card.
const LIST_RELATIONS = ['conversionClient', 'conversionVehicle', 'items', 'items.service'];

@Injectable()
export class JobCardsService {
  constructor(
    @InjectRepository(JobCard)
    private jobCardRepository: Repository<JobCard>,
    @InjectRepository(JobCardItem)
    private jobCardItemRepository: Repository<JobCardItem>,
    private inventoryService: InventoryService,
  ) {}

  async findAll(conversionVehicleId?: number, conversionClientId?: number): Promise<JobCard[]> {
    const where: Record<string, number> = {};
    if (conversionVehicleId) where.conversion_vehicle_id = conversionVehicleId;
    if (conversionClientId) where.conversion_client_id = conversionClientId;

    return this.jobCardRepository.find({
      where,
      relations: LIST_RELATIONS,
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<JobCard> {
    const jobCard = await this.jobCardRepository.findOne({
      where: { id },
      relations: RELATIONS,
    });

    if (!jobCard) {
      throw new NotFoundException(`Job card with ID ${id} not found`);
    }

    return jobCard;
  }

  async create(dto: CreateJobCardDto): Promise<JobCard> {
    const jobCard = this.jobCardRepository.create({
      conversion_client_id: dto.conversion_client_id ?? null,
      conversion_vehicle_id: dto.conversion_vehicle_id ?? null,
      status: dto.status || 'open',
      vat_enabled: dto.vat_enabled ?? 0,
      vat_rate: dto.vat_rate ?? 16,
      discount: dto.discount ?? 0,
      other_charges: dto.other_charges ?? 0,
      amount_paid: dto.amount_paid ?? 0,
      notes: dto.notes ?? null,
    });

    const saved = await this.jobCardRepository.save(jobCard);

    if (dto.items?.length) {
      await this.replaceItems(saved.id, dto.items);
    }

    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateJobCardDto): Promise<JobCard> {
    const jobCard = await this.findOne(id);

    const { items, ...fields } = dto;
    Object.assign(jobCard, fields);
    await this.jobCardRepository.save(jobCard);

    if (items) {
      await this.replaceItems(id, items);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const jobCard = await this.findOne(id);
    await this.jobCardRepository.remove(jobCard);
  }

  async convertToInvoice(id: number, dto: ConvertToInvoiceDto): Promise<JobCard> {
    const jobCard = await this.findOne(id);

    if (dto.update_inventory) {
      const partItems = (jobCard.items || []).filter(item => item.item_type === 'part' && item.part_id);

      if (partItems.length && !dto.store_id) {
        throw new BadRequestException('store_id is required to update inventory');
      }

      for (const item of partItems) {
        await this.inventoryService.recordTransaction({
          store_id: dto.store_id!,
          part_id: item.part_id!,
          transaction_type: TransactionType.OUT,
          quantity: Math.max(1, Math.round(Number(item.quantity))),
          reference_number: `JC-${jobCard.id}`,
          notes: 'Converted estimate to invoice',
        });
      }
    }

    jobCard.status = 'not_paid';
    await this.jobCardRepository.save(jobCard);

    return this.findOne(id);
  }

  private async replaceItems(jobCardId: number, items: CreateJobCardDto['items']): Promise<void> {
    await this.jobCardItemRepository.delete({ job_card_id: jobCardId });

    if (!items?.length) return;

    const rows = items.map(item => this.jobCardItemRepository.create({
      job_card_id: jobCardId,
      item_type: item.item_type,
      part_id: item.part_id ?? null,
      service_id: item.service_id ?? null,
      assigned_staff_id: item.assigned_staff_id ?? null,
      assigned_at: item.assigned_at ? new Date(item.assigned_at) : null,
      description: item.description,
      cost: item.cost ?? 0,
      price: item.price,
      quantity: item.quantity,
      taxable: item.taxable ?? 1,
      amount: item.amount,
    }));

    await this.jobCardItemRepository.save(rows);
  }
}

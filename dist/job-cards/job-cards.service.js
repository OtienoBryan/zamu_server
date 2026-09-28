"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_card_entity_1 = require("../entities/job-card.entity");
const job_card_item_entity_1 = require("../entities/job-card-item.entity");
const inventory_service_1 = require("../inventory/inventory.service");
const inventory_transaction_dto_1 = require("../inventory/dto/inventory-transaction.dto");
const RELATIONS = ['conversionClient', 'conversionVehicle', 'items', 'items.part', 'items.service', 'items.assignedStaff'];
const LIST_RELATIONS = ['conversionClient', 'conversionVehicle', 'items', 'items.service'];
let JobCardsService = class JobCardsService {
    jobCardRepository;
    jobCardItemRepository;
    inventoryService;
    constructor(jobCardRepository, jobCardItemRepository, inventoryService) {
        this.jobCardRepository = jobCardRepository;
        this.jobCardItemRepository = jobCardItemRepository;
        this.inventoryService = inventoryService;
    }
    async findAll(conversionVehicleId, conversionClientId) {
        const where = {};
        if (conversionVehicleId)
            where.conversion_vehicle_id = conversionVehicleId;
        if (conversionClientId)
            where.conversion_client_id = conversionClientId;
        return this.jobCardRepository.find({
            where,
            relations: LIST_RELATIONS,
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        const jobCard = await this.jobCardRepository.findOne({
            where: { id },
            relations: RELATIONS,
        });
        if (!jobCard) {
            throw new common_1.NotFoundException(`Job card with ID ${id} not found`);
        }
        return jobCard;
    }
    async create(dto) {
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
    async update(id, dto) {
        const jobCard = await this.findOne(id);
        const { items, ...fields } = dto;
        Object.assign(jobCard, fields);
        await this.jobCardRepository.save(jobCard);
        if (items) {
            await this.replaceItems(id, items);
        }
        return this.findOne(id);
    }
    async remove(id) {
        const jobCard = await this.findOne(id);
        await this.jobCardRepository.remove(jobCard);
    }
    async convertToInvoice(id, dto) {
        const jobCard = await this.findOne(id);
        if (dto.update_inventory) {
            const partItems = (jobCard.items || []).filter(item => item.item_type === 'part' && item.part_id);
            if (partItems.length && !dto.store_id) {
                throw new common_1.BadRequestException('store_id is required to update inventory');
            }
            for (const item of partItems) {
                await this.inventoryService.recordTransaction({
                    store_id: dto.store_id,
                    part_id: item.part_id,
                    transaction_type: inventory_transaction_dto_1.TransactionType.OUT,
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
    async replaceItems(jobCardId, items) {
        await this.jobCardItemRepository.delete({ job_card_id: jobCardId });
        if (!items?.length)
            return;
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
};
exports.JobCardsService = JobCardsService;
exports.JobCardsService = JobCardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_card_entity_1.JobCard)),
    __param(1, (0, typeorm_1.InjectRepository)(job_card_item_entity_1.JobCardItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        inventory_service_1.InventoryService])
], JobCardsService);
//# sourceMappingURL=job-cards.service.js.map
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
exports.PartsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const part_entity_1 = require("../entities/part.entity");
const part_inventory_entity_1 = require("../entities/part-inventory.entity");
let PartsService = class PartsService {
    partRepository;
    partInventoryRepository;
    constructor(partRepository, partInventoryRepository) {
        this.partRepository = partRepository;
        this.partInventoryRepository = partInventoryRepository;
    }
    async getTotalStockByPartId() {
        const rows = await this.partInventoryRepository
            .createQueryBuilder('pi')
            .select('pi.part_id', 'part_id')
            .addSelect('SUM(pi.quantity)', 'total')
            .groupBy('pi.part_id')
            .getRawMany();
        return new Map(rows.map(r => [Number(r.part_id), Number(r.total)]));
    }
    async getTotalStockForPart(partId) {
        const result = await this.partInventoryRepository
            .createQueryBuilder('pi')
            .select('SUM(pi.quantity)', 'total')
            .where('pi.part_id = :partId', { partId })
            .getRawOne();
        return result?.total != null ? Number(result.total) : 0;
    }
    async findAll() {
        console.log('📦 [PartsService] Finding all parts');
        const parts = await this.partRepository.find({
            order: { created_at: 'DESC' },
        });
        const totals = await this.getTotalStockByPartId();
        for (const part of parts) {
            part.stock_quantity = totals.get(part.id) ?? 0;
        }
        console.log(`✅ [PartsService] Found ${parts.length} parts`);
        return parts;
    }
    async findOne(id) {
        console.log(`📦 [PartsService] Finding part by ID: ${id}`);
        const part = await this.partRepository.findOne({
            where: { id },
        });
        if (!part) {
            throw new common_1.NotFoundException(`Part with ID ${id} not found`);
        }
        part.stock_quantity = await this.getTotalStockForPart(id);
        return part;
    }
    async create(createPartDto) {
        console.log('📦 [PartsService] Creating new part:', createPartDto.part_number);
        const existingPart = await this.partRepository.findOne({
            where: { part_number: createPartDto.part_number },
        });
        if (existingPart) {
            throw new Error(`Part number ${createPartDto.part_number} already exists`);
        }
        try {
            const part = this.partRepository.create({
                part_number: createPartDto.part_number,
                name: createPartDto.name,
                description: createPartDto.description || null,
                category: createPartDto.category || null,
                manufacturer: createPartDto.manufacturer || null,
                unit_price: createPartDto.unit_price || null,
                unit_price_usd: createPartDto.unit_price_usd || null,
                selling_price: createPartDto.selling_price,
                selling_price_usd: createPartDto.selling_price_usd,
                stock_quantity: createPartDto.stock_quantity || 0,
                min_stock_level: createPartDto.min_stock_level || 0,
                location: createPartDto.location || null,
                image_url: createPartDto.image_url || null,
            });
            const savedPart = await this.partRepository.save(part);
            console.log(`✅ [PartsService] Part created with ID: ${savedPart.id}`);
            return savedPart;
        }
        catch (error) {
            console.error('❌ [PartsService] Error creating part:', error);
            throw error;
        }
    }
    async update(id, updatePartDto) {
        console.log(`📦 [PartsService] Updating part with ID: ${id}`);
        const part = await this.findOne(id);
        if (updatePartDto.part_number && updatePartDto.part_number !== part.part_number) {
            const existingPart = await this.partRepository.findOne({
                where: { part_number: updatePartDto.part_number },
            });
            if (existingPart) {
                throw new Error(`Part number ${updatePartDto.part_number} already exists`);
            }
        }
        Object.assign(part, updatePartDto);
        const updatedPart = await this.partRepository.save(part);
        console.log(`✅ [PartsService] Part updated: ${updatedPart.part_number}`);
        return updatedPart;
    }
    async remove(id) {
        console.log(`📦 [PartsService] Deleting part with ID: ${id}`);
        const part = await this.findOne(id);
        await this.partRepository.remove(part);
        console.log(`✅ [PartsService] Part deleted: ${part.part_number}`);
    }
};
exports.PartsService = PartsService;
exports.PartsService = PartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(part_entity_1.Part)),
    __param(1, (0, typeorm_1.InjectRepository)(part_inventory_entity_1.PartInventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PartsService);
//# sourceMappingURL=parts.service.js.map
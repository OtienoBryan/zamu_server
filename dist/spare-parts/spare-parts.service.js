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
exports.SparePartsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const spare_part_entity_1 = require("../entities/spare-part.entity");
const spare_part_category_entity_1 = require("../entities/spare-part-category.entity");
let SparePartsService = class SparePartsService {
    sparePartRepository;
    categoryRepository;
    constructor(sparePartRepository, categoryRepository) {
        this.sparePartRepository = sparePartRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAll() {
        return this.sparePartRepository.find({
            relations: ['category'],
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const part = await this.sparePartRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!part) {
            throw new common_1.NotFoundException(`Spare part with ID ${id} not found`);
        }
        return part;
    }
    async create(dto) {
        if (dto.categoryId != null) {
            await this.ensureCategoryExists(dto.categoryId);
        }
        const part = this.sparePartRepository.create({
            name: dto.name,
            categoryId: dto.categoryId ?? null,
            partNumber: dto.partNumber ?? null,
            unitOfMeasure: dto.unitOfMeasure,
            quantity: dto.quantity ?? 0,
            alertQuantity: dto.alertQuantity ?? 0,
            cost: dto.cost ?? 0,
            description: dto.description ?? null,
            status: dto.status ?? 'active',
        });
        const saved = await this.sparePartRepository.save(part);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        const part = await this.findOne(id);
        if (dto.categoryId != null) {
            await this.ensureCategoryExists(dto.categoryId);
        }
        Object.assign(part, dto);
        await this.sparePartRepository.save(part);
        return this.findOne(id);
    }
    async remove(id) {
        const part = await this.findOne(id);
        await this.sparePartRepository.remove(part);
    }
    async findAllCategories() {
        return this.categoryRepository.find({ order: { name: 'ASC' } });
    }
    async createCategory(name) {
        const trimmed = name?.trim();
        if (!trimmed) {
            throw new common_1.ConflictException('Category name is required');
        }
        const existing = await this.categoryRepository.findOne({ where: { name: trimmed } });
        if (existing) {
            throw new common_1.ConflictException(`Category "${trimmed}" already exists`);
        }
        return this.categoryRepository.save(this.categoryRepository.create({ name: trimmed }));
    }
    async updateCategory(id, name) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        const trimmed = name?.trim();
        if (!trimmed) {
            throw new common_1.ConflictException('Category name is required');
        }
        const existing = await this.categoryRepository.findOne({ where: { name: trimmed } });
        if (existing && existing.id !== id) {
            throw new common_1.ConflictException(`Category "${trimmed}" already exists`);
        }
        category.name = trimmed;
        return this.categoryRepository.save(category);
    }
    async removeCategory(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        const partCount = await this.sparePartRepository.count({ where: { categoryId: id } });
        if (partCount > 0) {
            throw new common_1.ConflictException(`Cannot delete "${category.name}" — ${partCount} spare part${partCount === 1 ? ' uses' : 's use'} it. Reassign them first.`);
        }
        await this.categoryRepository.remove(category);
    }
    async ensureCategoryExists(categoryId) {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${categoryId} not found`);
        }
    }
};
exports.SparePartsService = SparePartsService;
exports.SparePartsService = SparePartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(spare_part_entity_1.SparePart)),
    __param(1, (0, typeorm_1.InjectRepository)(spare_part_category_entity_1.SparePartCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SparePartsService);
//# sourceMappingURL=spare-parts.service.js.map
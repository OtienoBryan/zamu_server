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
exports.MachinesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const machine_entity_1 = require("../entities/machine.entity");
const machine_category_entity_1 = require("../entities/machine-category.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
let MachinesService = class MachinesService {
    machineRepository;
    categoryRepository;
    storeRepository;
    constructor(machineRepository, categoryRepository, storeRepository) {
        this.machineRepository = machineRepository;
        this.categoryRepository = categoryRepository;
        this.storeRepository = storeRepository;
    }
    async findAll() {
        return this.machineRepository.find({
            relations: ['category', 'store'],
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const machine = await this.machineRepository.findOne({
            where: { id },
            relations: ['category', 'store'],
        });
        if (!machine) {
            throw new common_1.NotFoundException(`Machine with ID ${id} not found`);
        }
        return machine;
    }
    async create(dto) {
        if (dto.categoryId != null) {
            await this.ensureCategoryExists(dto.categoryId);
        }
        if (dto.storeId != null) {
            await this.ensureStoreExists(dto.storeId);
        }
        const machine = this.machineRepository.create({
            name: dto.name,
            machineCode: dto.machineCode ?? null,
            serialNumber: dto.serialNumber ?? null,
            categoryId: dto.categoryId ?? null,
            storeId: dto.storeId ?? null,
            maintenanceIntervalDays: dto.maintenanceIntervalDays ?? null,
            description: dto.description ?? null,
            status: dto.status ?? 'active',
        });
        const saved = await this.machineRepository.save(machine);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        const machine = await this.findOne(id);
        if (dto.categoryId != null) {
            await this.ensureCategoryExists(dto.categoryId);
        }
        if (dto.storeId != null) {
            await this.ensureStoreExists(dto.storeId);
        }
        Object.assign(machine, dto);
        await this.machineRepository.save(machine);
        return this.findOne(id);
    }
    async remove(id) {
        const machine = await this.findOne(id);
        await this.machineRepository.remove(machine);
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
        const machineCount = await this.machineRepository.count({ where: { categoryId: id } });
        if (machineCount > 0) {
            throw new common_1.ConflictException(`Cannot delete "${category.name}" — ${machineCount} machine${machineCount === 1 ? ' uses' : 's use'} it. Reassign them first.`);
        }
        await this.categoryRepository.remove(category);
    }
    async ensureCategoryExists(categoryId) {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${categoryId} not found`);
        }
    }
    async ensureStoreExists(storeId) {
        const store = await this.storeRepository.findOne({ where: { id: storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${storeId} not found`);
        }
    }
};
exports.MachinesService = MachinesService;
exports.MachinesService = MachinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(machine_entity_1.Machine)),
    __param(1, (0, typeorm_1.InjectRepository)(machine_category_entity_1.MachineCategory)),
    __param(2, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MachinesService);
//# sourceMappingURL=machines.service.js.map
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
exports.FinishedProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const finished_product_category_entity_1 = require("../entities/finished-product-category.entity");
const finished_product_material_entity_1 = require("../entities/finished-product-material.entity");
const raw_material_entity_1 = require("../entities/raw-material.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let FinishedProductsService = class FinishedProductsService {
    productRepository;
    categoryRepository;
    materialRepository;
    rawMaterialRepository;
    cloudinaryService;
    constructor(productRepository, categoryRepository, materialRepository, rawMaterialRepository, cloudinaryService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.materialRepository = materialRepository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async findAll() {
        return this.productRepository.find({
            relations: ['category'],
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Finished product with ID ${id} not found`);
        }
        return product;
    }
    async create(dto) {
        if (dto.categoryId != null) {
            await this.ensureCategoryExists(dto.categoryId);
        }
        const product = this.productRepository.create({
            name: dto.name,
            description: dto.description ?? null,
            imageUrl: dto.imageUrl ?? null,
            imagePublicId: dto.imagePublicId ?? null,
            sellingPrice: dto.sellingPrice,
            status: dto.status ?? 'active',
            categoryId: dto.categoryId ?? null,
            color: dto.color ?? null,
        });
        const saved = await this.productRepository.save(product);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        const product = await this.findOne(id);
        if (dto.categoryId != null) {
            await this.ensureCategoryExists(dto.categoryId);
        }
        if (dto.imagePublicId !== undefined && dto.imagePublicId !== product.imagePublicId && product.imagePublicId) {
            await this.cloudinaryService.deleteImage(product.imagePublicId).catch(() => undefined);
        }
        Object.assign(product, dto);
        await this.productRepository.save(product);
        return this.findOne(id);
    }
    async remove(id) {
        const product = await this.findOne(id);
        if (product.imagePublicId) {
            await this.cloudinaryService.deleteImage(product.imagePublicId).catch(() => undefined);
        }
        await this.productRepository.remove(product);
    }
    async uploadImage(file) {
        if (!file.mimetype.startsWith('image/')) {
            throw new common_1.ConflictException('File must be an image');
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new common_1.ConflictException('Image size must be less than 5MB');
        }
        const result = await this.cloudinaryService.uploadProductImage(file, 'finished-products');
        return { url: result.url, publicId: result.public_id };
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
    async ensureCategoryExists(categoryId) {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${categoryId} not found`);
        }
    }
    async findMaterials(productId) {
        await this.findOne(productId);
        return this.materialRepository.find({
            where: { finishedProductId: productId },
            relations: ['rawMaterial'],
            order: { id: 'ASC' },
        });
    }
    async addMaterial(productId, dto) {
        await this.findOne(productId);
        const rawMaterial = await this.rawMaterialRepository.findOne({ where: { id: dto.rawMaterialId } });
        if (!rawMaterial) {
            throw new common_1.NotFoundException(`Raw material with ID ${dto.rawMaterialId} not found`);
        }
        const existing = await this.materialRepository.findOne({
            where: { finishedProductId: productId, rawMaterialId: dto.rawMaterialId },
        });
        if (existing) {
            existing.quantity = Number(existing.quantity) + dto.quantity;
            await this.materialRepository.save(existing);
        }
        else {
            await this.materialRepository.save(this.materialRepository.create({
                finishedProductId: productId,
                rawMaterialId: dto.rawMaterialId,
                quantity: dto.quantity,
            }));
        }
        await this.recomputeProductionCost(productId);
        return this.findMaterials(productId);
    }
    async updateMaterialQuantity(productId, lineId, dto) {
        const line = await this.materialRepository.findOne({ where: { id: lineId, finishedProductId: productId } });
        if (!line) {
            throw new common_1.NotFoundException(`Material line with ID ${lineId} not found on this product`);
        }
        line.quantity = dto.quantity;
        await this.materialRepository.save(line);
        await this.recomputeProductionCost(productId);
        return this.findMaterials(productId);
    }
    async removeMaterial(productId, lineId) {
        const line = await this.materialRepository.findOne({ where: { id: lineId, finishedProductId: productId } });
        if (!line) {
            throw new common_1.NotFoundException(`Material line with ID ${lineId} not found on this product`);
        }
        await this.materialRepository.remove(line);
        await this.recomputeProductionCost(productId);
        return this.findMaterials(productId);
    }
    async recomputeProductionCost(productId) {
        const lines = await this.materialRepository.find({
            where: { finishedProductId: productId },
            relations: ['rawMaterial'],
        });
        const productionCost = lines.reduce((sum, line) => sum + Number(line.quantity) * Number(line.rawMaterial.cost), 0);
        await this.productRepository.update(productId, { productionCost });
    }
};
exports.FinishedProductsService = FinishedProductsService;
exports.FinishedProductsService = FinishedProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(finished_product_entity_1.FinishedProduct)),
    __param(1, (0, typeorm_1.InjectRepository)(finished_product_category_entity_1.FinishedProductCategory)),
    __param(2, (0, typeorm_1.InjectRepository)(finished_product_material_entity_1.FinishedProductMaterial)),
    __param(3, (0, typeorm_1.InjectRepository)(raw_material_entity_1.RawMaterial)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], FinishedProductsService);
//# sourceMappingURL=finished-products.service.js.map
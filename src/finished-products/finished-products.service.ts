import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductCategory } from '../entities/finished-product-category.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { RawMaterial } from '../entities/raw-material.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';
import { AddMaterialDto } from './dto/add-material.dto';
import { UpdateMaterialQuantityDto } from './dto/update-material-quantity.dto';

@Injectable()
export class FinishedProductsService {
  constructor(
    @InjectRepository(FinishedProduct)
    private productRepository: Repository<FinishedProduct>,
    @InjectRepository(FinishedProductCategory)
    private categoryRepository: Repository<FinishedProductCategory>,
    @InjectRepository(FinishedProductMaterial)
    private materialRepository: Repository<FinishedProductMaterial>,
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<FinishedProduct[]> {
    return this.productRepository.find({
      relations: ['category'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<FinishedProduct> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Finished product with ID ${id} not found`);
    }
    return product;
  }

  async create(dto: CreateFinishedProductDto): Promise<FinishedProduct> {
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

  async update(id: number, dto: UpdateFinishedProductDto): Promise<FinishedProduct> {
    const product = await this.findOne(id);
    if (dto.categoryId != null) {
      await this.ensureCategoryExists(dto.categoryId);
    }
    // Swapping in a new image — clean up the old one in Cloudinary so it doesn't
    // just pile up as an orphaned asset.
    if (dto.imagePublicId !== undefined && dto.imagePublicId !== product.imagePublicId && product.imagePublicId) {
      await this.cloudinaryService.deleteImage(product.imagePublicId).catch(() => undefined);
    }
    Object.assign(product, dto);
    await this.productRepository.save(product);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    if (product.imagePublicId) {
      await this.cloudinaryService.deleteImage(product.imagePublicId).catch(() => undefined);
    }
    await this.productRepository.remove(product);
  }

  async uploadImage(file: Express.Multer.File): Promise<{ url: string; publicId: string }> {
    if (!file.mimetype.startsWith('image/')) {
      throw new ConflictException('File must be an image');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new ConflictException('Image size must be less than 5MB');
    }
    const result = await this.cloudinaryService.uploadProductImage(file, 'finished-products');
    return { url: result.url, publicId: result.public_id };
  }

  async findAllCategories(): Promise<FinishedProductCategory[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  async createCategory(name: string): Promise<FinishedProductCategory> {
    const trimmed = name?.trim();
    if (!trimmed) {
      throw new ConflictException('Category name is required');
    }
    const existing = await this.categoryRepository.findOne({ where: { name: trimmed } });
    if (existing) {
      throw new ConflictException(`Category "${trimmed}" already exists`);
    }
    return this.categoryRepository.save(this.categoryRepository.create({ name: trimmed }));
  }

  private async ensureCategoryExists(categoryId: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  }

  // ── Bill of materials ──
  async findMaterials(productId: number): Promise<FinishedProductMaterial[]> {
    await this.findOne(productId);
    return this.materialRepository.find({
      where: { finishedProductId: productId },
      relations: ['rawMaterial'],
      order: { id: 'ASC' },
    });
  }

  async addMaterial(productId: number, dto: AddMaterialDto): Promise<FinishedProductMaterial[]> {
    await this.findOne(productId);
    const rawMaterial = await this.rawMaterialRepository.findOne({ where: { id: dto.rawMaterialId } });
    if (!rawMaterial) {
      throw new NotFoundException(`Raw material with ID ${dto.rawMaterialId} not found`);
    }

    const existing = await this.materialRepository.findOne({
      where: { finishedProductId: productId, rawMaterialId: dto.rawMaterialId },
    });
    if (existing) {
      // Already on the BOM — treat a second "add" as bumping the quantity rather
      // than erroring, since the unique (product, material) constraint forbids a duplicate row.
      existing.quantity = Number(existing.quantity) + dto.quantity;
      await this.materialRepository.save(existing);
    } else {
      await this.materialRepository.save(
        this.materialRepository.create({
          finishedProductId: productId,
          rawMaterialId: dto.rawMaterialId,
          quantity: dto.quantity,
        }),
      );
    }

    await this.recomputeProductionCost(productId);
    return this.findMaterials(productId);
  }

  async updateMaterialQuantity(
    productId: number,
    lineId: number,
    dto: UpdateMaterialQuantityDto,
  ): Promise<FinishedProductMaterial[]> {
    const line = await this.materialRepository.findOne({ where: { id: lineId, finishedProductId: productId } });
    if (!line) {
      throw new NotFoundException(`Material line with ID ${lineId} not found on this product`);
    }
    line.quantity = dto.quantity;
    await this.materialRepository.save(line);

    await this.recomputeProductionCost(productId);
    return this.findMaterials(productId);
  }

  async removeMaterial(productId: number, lineId: number): Promise<FinishedProductMaterial[]> {
    const line = await this.materialRepository.findOne({ where: { id: lineId, finishedProductId: productId } });
    if (!line) {
      throw new NotFoundException(`Material line with ID ${lineId} not found on this product`);
    }
    await this.materialRepository.remove(line);

    await this.recomputeProductionCost(productId);
    return this.findMaterials(productId);
  }

  private async recomputeProductionCost(productId: number): Promise<void> {
    const lines = await this.materialRepository.find({
      where: { finishedProductId: productId },
      relations: ['rawMaterial'],
    });
    const productionCost = lines.reduce(
      (sum, line) => sum + Number(line.quantity) * Number(line.rawMaterial.cost),
      0,
    );
    await this.productRepository.update(productId, { productionCost });
  }
}

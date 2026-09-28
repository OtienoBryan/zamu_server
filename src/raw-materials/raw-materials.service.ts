import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterial } from '../entities/raw-material.entity';
import { RawMaterialCategory } from '../entities/raw-material-category.entity';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
    @InjectRepository(RawMaterialCategory)
    private categoryRepository: Repository<RawMaterialCategory>,
  ) {}

  async findAll(): Promise<RawMaterial[]> {
    return this.rawMaterialRepository.find({
      relations: ['category'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<RawMaterial> {
    const material = await this.rawMaterialRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!material) {
      throw new NotFoundException(`Raw material with ID ${id} not found`);
    }
    return material;
  }

  async create(dto: CreateRawMaterialDto): Promise<RawMaterial> {
    if (dto.categoryId != null) {
      await this.ensureCategoryExists(dto.categoryId);
    }
    const material = this.rawMaterialRepository.create({
      name: dto.name,
      categoryId: dto.categoryId ?? null,
      unitOfMeasure: dto.unitOfMeasure,
      alertQuantity: dto.alertQuantity ?? 0,
      description: dto.description ?? null,
      cost: dto.cost,
      status: dto.status ?? 'active',
    });
    const saved = await this.rawMaterialRepository.save(material);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateRawMaterialDto): Promise<RawMaterial> {
    const material = await this.findOne(id);
    if (dto.categoryId != null) {
      await this.ensureCategoryExists(dto.categoryId);
    }
    Object.assign(material, dto);
    await this.rawMaterialRepository.save(material);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const material = await this.findOne(id);
    await this.rawMaterialRepository.remove(material);
  }

  async findAllCategories(): Promise<RawMaterialCategory[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  async createCategory(name: string): Promise<RawMaterialCategory> {
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

  async updateCategory(id: number, name: string): Promise<RawMaterialCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const trimmed = name?.trim();
    if (!trimmed) {
      throw new ConflictException('Category name is required');
    }
    const existing = await this.categoryRepository.findOne({ where: { name: trimmed } });
    if (existing && existing.id !== id) {
      throw new ConflictException(`Category "${trimmed}" already exists`);
    }
    category.name = trimmed;
    return this.categoryRepository.save(category);
  }

  async removeCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const materialCount = await this.rawMaterialRepository.count({ where: { categoryId: id } });
    if (materialCount > 0) {
      throw new ConflictException(
        `Cannot delete "${category.name}" — ${materialCount} raw material${materialCount === 1 ? ' uses' : 's use'} it. Reassign them first.`,
      );
    }
    await this.categoryRepository.remove(category);
  }

  private async ensureCategoryExists(categoryId: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  }
}

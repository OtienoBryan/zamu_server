import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartCategory } from '../entities/spare-part-category.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
    @InjectRepository(SparePartCategory)
    private categoryRepository: Repository<SparePartCategory>,
  ) {}

  async findAll(): Promise<SparePart[]> {
    return this.sparePartRepository.find({
      relations: ['category'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<SparePart> {
    const part = await this.sparePartRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!part) {
      throw new NotFoundException(`Spare part with ID ${id} not found`);
    }
    return part;
  }

  async create(dto: CreateSparePartDto): Promise<SparePart> {
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

  async update(id: number, dto: UpdateSparePartDto): Promise<SparePart> {
    const part = await this.findOne(id);
    if (dto.categoryId != null) {
      await this.ensureCategoryExists(dto.categoryId);
    }
    Object.assign(part, dto);
    await this.sparePartRepository.save(part);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const part = await this.findOne(id);
    await this.sparePartRepository.remove(part);
  }

  async findAllCategories(): Promise<SparePartCategory[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  async createCategory(name: string): Promise<SparePartCategory> {
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

  async updateCategory(id: number, name: string): Promise<SparePartCategory> {
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
    const partCount = await this.sparePartRepository.count({ where: { categoryId: id } });
    if (partCount > 0) {
      throw new ConflictException(
        `Cannot delete "${category.name}" — ${partCount} spare part${partCount === 1 ? ' uses' : 's use'} it. Reassign them first.`,
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

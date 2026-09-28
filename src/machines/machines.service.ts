import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';
import { MachineCategory } from '../entities/machine-category.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machineRepository: Repository<Machine>,
    @InjectRepository(MachineCategory)
    private categoryRepository: Repository<MachineCategory>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
  ) {}

  async findAll(): Promise<Machine[]> {
    return this.machineRepository.find({
      relations: ['category', 'store'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Machine> {
    const machine = await this.machineRepository.findOne({
      where: { id },
      relations: ['category', 'store'],
    });
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }
    return machine;
  }

  async create(dto: CreateMachineDto): Promise<Machine> {
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

  async update(id: number, dto: UpdateMachineDto): Promise<Machine> {
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

  async remove(id: number): Promise<void> {
    const machine = await this.findOne(id);
    await this.machineRepository.remove(machine);
  }

  async findAllCategories(): Promise<MachineCategory[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  async createCategory(name: string): Promise<MachineCategory> {
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

  async updateCategory(id: number, name: string): Promise<MachineCategory> {
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
    const machineCount = await this.machineRepository.count({ where: { categoryId: id } });
    if (machineCount > 0) {
      throw new ConflictException(
        `Cannot delete "${category.name}" — ${machineCount} machine${machineCount === 1 ? ' uses' : 's use'} it. Reassign them first.`,
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

  private async ensureStoreExists(storeId: number): Promise<void> {
    const store = await this.storeRepository.findOne({ where: { id: storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }
  }
}

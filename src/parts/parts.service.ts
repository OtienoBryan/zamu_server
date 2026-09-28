import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from '../entities/part.entity';
import { PartInventory } from '../entities/part-inventory.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private partRepository: Repository<Part>,
    @InjectRepository(PartInventory)
    private partInventoryRepository: Repository<PartInventory>,
  ) {}

  private async getTotalStockByPartId(): Promise<Map<number, number>> {
    const rows = await this.partInventoryRepository
      .createQueryBuilder('pi')
      .select('pi.part_id', 'part_id')
      .addSelect('SUM(pi.quantity)', 'total')
      .groupBy('pi.part_id')
      .getRawMany<{ part_id: number; total: string }>();

    return new Map(rows.map(r => [Number(r.part_id), Number(r.total)]));
  }

  private async getTotalStockForPart(partId: number): Promise<number> {
    const result = await this.partInventoryRepository
      .createQueryBuilder('pi')
      .select('SUM(pi.quantity)', 'total')
      .where('pi.part_id = :partId', { partId })
      .getRawOne<{ total: string | null }>();

    return result?.total != null ? Number(result.total) : 0;
  }

  async findAll(): Promise<Part[]> {
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

  async findOne(id: number): Promise<Part> {
    console.log(`📦 [PartsService] Finding part by ID: ${id}`);

    const part = await this.partRepository.findOne({
      where: { id },
    });

    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found`);
    }

    part.stock_quantity = await this.getTotalStockForPart(id);

    return part;
  }

  async create(createPartDto: CreatePartDto): Promise<Part> {
    console.log('📦 [PartsService] Creating new part:', createPartDto.part_number);
    
    // Check if part number already exists
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
    } catch (error) {
      console.error('❌ [PartsService] Error creating part:', error);
      throw error;
    }
  }

  async update(id: number, updatePartDto: UpdatePartDto): Promise<Part> {
    console.log(`📦 [PartsService] Updating part with ID: ${id}`);
    
    const part = await this.findOne(id);
    
    // If part_number is being updated, check for duplicates
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

  async remove(id: number): Promise<void> {
    console.log(`📦 [PartsService] Deleting part with ID: ${id}`);
    
    const part = await this.findOne(id);
    await this.partRepository.remove(part);
    console.log(`✅ [PartsService] Part deleted: ${part.part_number}`);
  }
}


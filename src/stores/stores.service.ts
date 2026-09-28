import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<Store[]> {
    console.log('🏪 [StoresService] Finding all stores');
    
    const stores = await this.storeRepository.find({
      order: { created_at: 'DESC' },
    });
    
    console.log(`✅ [StoresService] Found ${stores.length} stores`);
    return stores;
  }

  async findOne(id: number): Promise<Store> {
    console.log(`🏪 [StoresService] Finding store by ID: ${id}`);
    
    const store = await this.storeRepository.findOne({
      where: { id },
    });
    
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    
    return store;
  }

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    console.log('🏪 [StoresService] Creating new store');
    
    // Generate unique store code if not provided
    let storeCode: string;
    
    if (createStoreDto.store_code && createStoreDto.store_code.trim() !== '') {
      storeCode = createStoreDto.store_code.trim();
      // Check if provided store code already exists
      const existingStore = await this.storeRepository.findOne({
        where: { store_code: storeCode },
      });
      
      if (existingStore) {
        throw new Error(`Store code ${storeCode} already exists`);
      }
    } else {
      // Generate a unique auto-incrementing store code
      storeCode = await this.generateUniqueStoreCode();
    }
    
    try {
      const store = this.storeRepository.create({
        store_code: storeCode,
        store_name: createStoreDto.store_name,
        address: createStoreDto.address ?? null,
        country_id: createStoreDto.country_id,
        is_active: createStoreDto.is_active !== undefined ? createStoreDto.is_active : true,
      });
      
      const savedStore = await this.storeRepository.save(store);
      console.log(`✅ [StoresService] Store created with ID: ${savedStore.id}, Store Code: ${savedStore.store_code}`);
      
      return savedStore;
    } catch (error) {
      console.error('❌ [StoresService] Error creating store:', error);
      throw error;
    }
  }

  private async generateUniqueStoreCode(): Promise<string> {
    const prefix = 'STR';
    let storeCode: string = '';
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 1000;

    // Find the highest existing store code number
    const allStores = await this.storeRepository.find({
      order: { created_at: 'DESC' },
    });

    // Extract numbers from existing store codes (format: STR-0001, STR-0002, etc.)
    let maxNumber = 0;
    for (const store of allStores) {
      if (store.store_code && store.store_code.startsWith(prefix + '-')) {
        const numberPart = store.store_code.replace(prefix + '-', '');
        const number = parseInt(numberPart, 10);
        if (!isNaN(number) && number > maxNumber) {
          maxNumber = number;
        }
      }
    }

    // Generate the next store code
    const nextNumber = maxNumber + 1;
    storeCode = `${prefix}-${nextNumber.toString().padStart(4, '0')}`;

    // Verify it's unique (in case of any gaps or manual entries)
    while (!isUnique && attempts < maxAttempts) {
      const existing = await this.storeRepository.findOne({
        where: { store_code: storeCode },
      });

      if (!existing) {
        isUnique = true;
      } else {
        // If it exists, try the next number
        const currentNumber = parseInt(storeCode.replace(prefix + '-', ''), 10);
        const nextNumber = currentNumber + 1;
        storeCode = `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
        attempts++;
      }
    }

    if (!isUnique || !storeCode) {
      throw new Error('Failed to generate unique store code after multiple attempts');
    }

    return storeCode;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    console.log(`🏪 [StoresService] Updating store with ID: ${id}`);
    
    const store = await this.findOne(id);
    
    // Don't allow updating store_code - it's auto-generated and should remain unchanged
    const { store_code, ...updateData } = updateStoreDto;
    
    if (store_code && store_code !== store.store_code) {
      console.warn(`⚠️ [StoresService] Attempt to change store_code from ${store.store_code} to ${store_code} - ignoring`);
    }
    
    Object.assign(store, updateData);
    const updatedStore = await this.storeRepository.save(store);
    console.log(`✅ [StoresService] Store updated: ${updatedStore.store_code}`);
    
    return updatedStore;
  }

  async remove(id: number): Promise<void> {
    console.log(`🏪 [StoresService] Deleting store with ID: ${id}`);
    
    const store = await this.findOne(id);
    await this.storeRepository.remove(store);
    console.log(`✅ [StoresService] Store deleted: ${store.store_code}`);
  }
}


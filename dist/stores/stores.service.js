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
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("../entities/store.entity");
let StoresService = class StoresService {
    storeRepository;
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
    }
    async findAll() {
        console.log('🏪 [StoresService] Finding all stores');
        const stores = await this.storeRepository.find({
            order: { created_at: 'DESC' },
        });
        console.log(`✅ [StoresService] Found ${stores.length} stores`);
        return stores;
    }
    async findOne(id) {
        console.log(`🏪 [StoresService] Finding store by ID: ${id}`);
        const store = await this.storeRepository.findOne({
            where: { id },
        });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${id} not found`);
        }
        return store;
    }
    async create(createStoreDto) {
        console.log('🏪 [StoresService] Creating new store');
        let storeCode;
        if (createStoreDto.store_code && createStoreDto.store_code.trim() !== '') {
            storeCode = createStoreDto.store_code.trim();
            const existingStore = await this.storeRepository.findOne({
                where: { store_code: storeCode },
            });
            if (existingStore) {
                throw new Error(`Store code ${storeCode} already exists`);
            }
        }
        else {
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
        }
        catch (error) {
            console.error('❌ [StoresService] Error creating store:', error);
            throw error;
        }
    }
    async generateUniqueStoreCode() {
        const prefix = 'STR';
        let storeCode = '';
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 1000;
        const allStores = await this.storeRepository.find({
            order: { created_at: 'DESC' },
        });
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
        const nextNumber = maxNumber + 1;
        storeCode = `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
        while (!isUnique && attempts < maxAttempts) {
            const existing = await this.storeRepository.findOne({
                where: { store_code: storeCode },
            });
            if (!existing) {
                isUnique = true;
            }
            else {
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
    async update(id, updateStoreDto) {
        console.log(`🏪 [StoresService] Updating store with ID: ${id}`);
        const store = await this.findOne(id);
        const { store_code, ...updateData } = updateStoreDto;
        if (store_code && store_code !== store.store_code) {
            console.warn(`⚠️ [StoresService] Attempt to change store_code from ${store.store_code} to ${store_code} - ignoring`);
        }
        Object.assign(store, updateData);
        const updatedStore = await this.storeRepository.save(store);
        console.log(`✅ [StoresService] Store updated: ${updatedStore.store_code}`);
        return updatedStore;
    }
    async remove(id) {
        console.log(`🏪 [StoresService] Deleting store with ID: ${id}`);
        const store = await this.findOne(id);
        await this.storeRepository.remove(store);
        console.log(`✅ [StoresService] Store deleted: ${store.store_code}`);
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoresService);
//# sourceMappingURL=stores.service.js.map
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
exports.WorkOrderWasteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const work_order_waste_entity_1 = require("../entities/work-order-waste.entity");
const work_order_entity_1 = require("../entities/work-order.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const raw_material_store_inventory_entity_1 = require("../entities/raw-material-store-inventory.entity");
const raw_material_inventory_ledger_entity_1 = require("../entities/raw-material-inventory-ledger.entity");
const RELATIONS = ['workOrder', 'workOrder.product', 'workOrder.stage', 'rawMaterial', 'store'];
let WorkOrderWasteService = class WorkOrderWasteService {
    wasteRepository;
    workOrderRepository;
    storeRepository;
    dataSource;
    constructor(wasteRepository, workOrderRepository, storeRepository, dataSource) {
        this.wasteRepository = wasteRepository;
        this.workOrderRepository = workOrderRepository;
        this.storeRepository = storeRepository;
        this.dataSource = dataSource;
    }
    async findForWorkOrder(workOrderId) {
        return this.wasteRepository.find({
            where: { workOrderId },
            relations: RELATIONS,
            order: { createdAt: 'DESC' },
        });
    }
    async findAll(type) {
        return this.wasteRepository.find({
            where: type ? { type } : {},
            relations: RELATIONS,
            order: { createdAt: 'DESC' },
        });
    }
    async create(dto) {
        const workOrder = await this.workOrderRepository.findOne({
            where: { id: dto.workOrderId },
            relations: ['materials'],
        });
        if (!workOrder) {
            throw new common_1.NotFoundException(`Production order with ID ${dto.workOrderId} not found`);
        }
        if (workOrder.status === 'cancelled') {
            throw new common_1.BadRequestException('Cannot record waste for a cancelled production order');
        }
        const usedMaterialIds = new Set((workOrder.materials || []).map((m) => m.rawMaterialId));
        if (!usedMaterialIds.has(dto.rawMaterialId)) {
            throw new common_1.BadRequestException('This raw material is not part of the materials selected for this production order');
        }
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        const reusable = dto.type === 'offcut' && dto.reusable === true;
        const stockAction = reusable ? 'returned' : 'deducted';
        const quantity = dto.quantity;
        const savedId = await this.dataSource.transaction(async (manager) => {
            const inventory = await manager.findOne(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, {
                where: { storeId: dto.storeId, rawMaterialId: dto.rawMaterialId },
            });
            const previousQuantity = inventory ? Number(inventory.quantity) : 0;
            const newQuantity = stockAction === 'returned' ? previousQuantity + quantity : previousQuantity - quantity;
            if (stockAction === 'deducted' && newQuantity < 0) {
                throw new common_1.BadRequestException(`Not enough stock of this raw material at ${store.name} to record this loss (have ${previousQuantity}, need ${quantity})`);
            }
            if (inventory) {
                await manager.update(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, { storeId: dto.storeId, rawMaterialId: dto.rawMaterialId }, { quantity: newQuantity });
            }
            else {
                await manager.save(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, manager.create(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, { storeId: dto.storeId, rawMaterialId: dto.rawMaterialId, quantity: newQuantity }));
            }
            const label = dto.type === 'offcut' ? (reusable ? 'Reusable offcut returned to stock' : 'Unusable offcut written off') : 'Damage written off';
            const ledgerEntry = manager.create(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, {
                storeId: dto.storeId,
                rawMaterialId: dto.rawMaterialId,
                transactionType: 'adjustment',
                quantity,
                previousQuantity,
                newQuantity,
                notes: `${label} — Production Order #${workOrder.id} (${workOrder.description})${dto.notes ? `: ${dto.notes}` : ''}`,
            });
            await manager.save(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, ledgerEntry);
            const entry = manager.create(work_order_waste_entity_1.WorkOrderWasteEntry, {
                workOrderId: dto.workOrderId,
                rawMaterialId: dto.rawMaterialId,
                storeId: dto.storeId,
                type: dto.type,
                reusable,
                quantity,
                stockAction,
                notes: dto.notes ?? null,
            });
            const saved = await manager.save(work_order_waste_entity_1.WorkOrderWasteEntry, entry);
            return saved.id;
        });
        return this.wasteRepository.findOne({ where: { id: savedId }, relations: RELATIONS });
    }
    async remove(id) {
        const entry = await this.wasteRepository.findOne({ where: { id } });
        if (!entry) {
            throw new common_1.NotFoundException(`Waste entry with ID ${id} not found`);
        }
        await this.dataSource.transaction(async (manager) => {
            const inventory = await manager.findOne(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, {
                where: { storeId: entry.storeId, rawMaterialId: entry.rawMaterialId },
            });
            const previousQuantity = inventory ? Number(inventory.quantity) : 0;
            const newQuantity = entry.stockAction === 'returned' ? previousQuantity - Number(entry.quantity) : previousQuantity + Number(entry.quantity);
            if (inventory) {
                await manager.update(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, { storeId: entry.storeId, rawMaterialId: entry.rawMaterialId }, { quantity: newQuantity });
            }
            else {
                await manager.save(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, manager.create(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, { storeId: entry.storeId, rawMaterialId: entry.rawMaterialId, quantity: newQuantity }));
            }
            const ledgerEntry = manager.create(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, {
                storeId: entry.storeId,
                rawMaterialId: entry.rawMaterialId,
                transactionType: 'adjustment',
                quantity: Number(entry.quantity),
                previousQuantity,
                newQuantity,
                notes: `Reversal of ${entry.type} waste entry #${entry.id} on Production Order #${entry.workOrderId}`,
            });
            await manager.save(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, ledgerEntry);
            await manager.remove(work_order_waste_entity_1.WorkOrderWasteEntry, entry);
        });
    }
};
exports.WorkOrderWasteService = WorkOrderWasteService;
exports.WorkOrderWasteService = WorkOrderWasteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_order_waste_entity_1.WorkOrderWasteEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(work_order_entity_1.WorkOrder)),
    __param(2, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], WorkOrderWasteService);
//# sourceMappingURL=work-order-waste.service.js.map
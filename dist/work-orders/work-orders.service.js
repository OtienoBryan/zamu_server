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
exports.WorkOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const work_order_entity_1 = require("../entities/work-order.entity");
const work_order_staff_entity_1 = require("../entities/work-order-staff.entity");
const work_order_material_entity_1 = require("../entities/work-order-material.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const finished_product_material_entity_1 = require("../entities/finished-product-material.entity");
const production_stage_entity_1 = require("../entities/production-stage.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const raw_material_store_inventory_entity_1 = require("../entities/raw-material-store-inventory.entity");
const raw_material_inventory_ledger_entity_1 = require("../entities/raw-material-inventory-ledger.entity");
const RELATIONS = ['product', 'stage', 'staff', 'assignedStaff', 'assignedStaff.staffMember', 'materials', 'materials.rawMaterial'];
let WorkOrdersService = class WorkOrdersService {
    workOrderRepository;
    productRepository;
    materialRepository;
    stageRepository;
    staffRepository;
    storeRepository;
    dataSource;
    constructor(workOrderRepository, productRepository, materialRepository, stageRepository, staffRepository, storeRepository, dataSource) {
        this.workOrderRepository = workOrderRepository;
        this.productRepository = productRepository;
        this.materialRepository = materialRepository;
        this.stageRepository = stageRepository;
        this.staffRepository = staffRepository;
        this.storeRepository = storeRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.workOrderRepository.find({
            relations: RELATIONS,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const workOrder = await this.workOrderRepository.findOne({
            where: { id },
            relations: RELATIONS,
        });
        if (!workOrder) {
            throw new common_1.NotFoundException(`Work order with ID ${id} not found`);
        }
        return workOrder;
    }
    async create(dto) {
        if (dto.status === 'completed') {
            throw new common_1.BadRequestException('A production order can only be marked completed via the Confirm Work flow');
        }
        await this.ensureReferencesExist(dto.productId, dto.stageId, dto.staffIds);
        await this.ensureMaterialsInBom(dto.productId, dto.materials);
        const staffIds = Array.from(new Set(dto.staffIds));
        const materials = this.dedupeMaterials(dto.materials ?? []);
        const savedId = await this.dataSource.transaction(async (manager) => {
            const workOrder = manager.create(work_order_entity_1.WorkOrder, {
                description: dto.description,
                productId: dto.productId,
                stageId: dto.stageId,
                staffId: staffIds[0],
                date: dto.date,
                targetQuantity: dto.targetQuantity,
                status: dto.status ?? 'pending',
            });
            const saved = await manager.save(work_order_entity_1.WorkOrder, workOrder);
            for (const staffMemberId of staffIds) {
                await manager.save(work_order_staff_entity_1.WorkOrderStaff, manager.create(work_order_staff_entity_1.WorkOrderStaff, { workOrderId: saved.id, staffMemberId }));
            }
            for (const m of materials) {
                await manager.save(work_order_material_entity_1.WorkOrderMaterial, manager.create(work_order_material_entity_1.WorkOrderMaterial, {
                    workOrderId: saved.id,
                    rawMaterialId: m.rawMaterialId,
                    quantity: m.quantity,
                }));
            }
            return saved.id;
        });
        return this.findOne(savedId);
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (dto.status === 'completed' && existing.status !== 'completed') {
            throw new common_1.BadRequestException('A production order can only be marked completed via the Confirm Work flow');
        }
        await this.ensureReferencesExist(dto.productId, dto.stageId, dto.staffIds);
        await this.ensureMaterialsInBom(dto.productId ?? existing.productId, dto.materials);
        const staffIds = dto.staffIds ? Array.from(new Set(dto.staffIds)) : undefined;
        const materials = dto.materials ? this.dedupeMaterials(dto.materials) : undefined;
        await this.dataSource.transaction(async (manager) => {
            const { staffIds: _omitStaff, materials: _omitMaterials, ...columns } = dto;
            await manager.update(work_order_entity_1.WorkOrder, id, staffIds ? { ...columns, staffId: staffIds[0] } : columns);
            if (staffIds) {
                await manager.delete(work_order_staff_entity_1.WorkOrderStaff, { workOrderId: id });
                for (const staffMemberId of staffIds) {
                    await manager.save(work_order_staff_entity_1.WorkOrderStaff, manager.create(work_order_staff_entity_1.WorkOrderStaff, { workOrderId: id, staffMemberId }));
                }
            }
            if (materials) {
                await manager.delete(work_order_material_entity_1.WorkOrderMaterial, { workOrderId: id });
                for (const m of materials) {
                    await manager.save(work_order_material_entity_1.WorkOrderMaterial, manager.create(work_order_material_entity_1.WorkOrderMaterial, {
                        workOrderId: id,
                        rawMaterialId: m.rawMaterialId,
                        quantity: m.quantity,
                    }));
                }
            }
        });
        return this.findOne(id);
    }
    async remove(id) {
        const workOrder = await this.findOne(id);
        await this.workOrderRepository.remove(workOrder);
    }
    async confirmComplete(id, dto) {
        const workOrder = await this.findOne(id);
        if (workOrder.status === 'completed') {
            throw new common_1.ConflictException('This production order is already completed');
        }
        if (workOrder.status === 'cancelled') {
            throw new common_1.ConflictException('Cannot complete a cancelled production order');
        }
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        const required = workOrder.materials.map((m) => ({
            line: m,
            requiredQuantity: Number(m.quantity),
        }));
        if (required.length > 0) {
            const inventoryRows = await this.dataSource.getRepository(raw_material_store_inventory_entity_1.RawMaterialStoreInventory).find({
                where: { storeId: dto.storeId, rawMaterialId: (0, typeorm_2.In)(required.map((r) => r.line.rawMaterialId)) },
            });
            const availableById = new Map(inventoryRows.map((row) => [row.rawMaterialId, Number(row.quantity)]));
            const shortages = required
                .map((r) => ({
                name: r.line.rawMaterial?.name ?? `#${r.line.rawMaterialId}`,
                required: r.requiredQuantity,
                available: availableById.get(r.line.rawMaterialId) ?? 0,
            }))
                .filter((s) => s.available < s.required);
            if (shortages.length > 0) {
                const detail = shortages.map((s) => `${s.name} (need ${s.required}, have ${s.available})`).join('; ');
                throw new common_1.BadRequestException(`Not enough raw material stock at ${store.name} to complete this order: ${detail}`);
            }
        }
        await this.dataSource.transaction(async (manager) => {
            for (const r of required) {
                const inventory = await manager.findOne(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, {
                    where: { storeId: dto.storeId, rawMaterialId: r.line.rawMaterialId },
                });
                const previousQuantity = inventory ? Number(inventory.quantity) : 0;
                const newQuantity = previousQuantity - r.requiredQuantity;
                await manager.update(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, { storeId: dto.storeId, rawMaterialId: r.line.rawMaterialId }, { quantity: newQuantity });
                const ledgerEntry = manager.create(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, {
                    storeId: dto.storeId,
                    rawMaterialId: r.line.rawMaterialId,
                    transactionType: 'production_use',
                    quantity: r.requiredQuantity,
                    previousQuantity,
                    newQuantity,
                    notes: `Used to complete Production Order #${workOrder.id} (${workOrder.description})`,
                });
                await manager.save(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, ledgerEntry);
            }
            await manager.update(work_order_entity_1.WorkOrder, id, { status: 'completed' });
        });
        return this.findOne(id);
    }
    async ensureReferencesExist(productId, stageId, staffIds) {
        if (productId != null) {
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product)
                throw new common_1.NotFoundException(`Finished product with ID ${productId} not found`);
        }
        if (stageId != null) {
            const stage = await this.stageRepository.findOne({ where: { id: stageId } });
            if (!stage)
                throw new common_1.NotFoundException(`Production stage with ID ${stageId} not found`);
        }
        if (staffIds != null && staffIds.length > 0) {
            const found = await this.staffRepository.find({ where: { id: (0, typeorm_2.In)(staffIds) } });
            const foundIds = new Set(found.map((s) => s.id));
            const missing = staffIds.filter((id) => !foundIds.has(id));
            if (missing.length > 0)
                throw new common_1.NotFoundException(`Staff member(s) with ID ${missing.join(', ')} not found`);
        }
    }
    async ensureMaterialsInBom(productId, materials) {
        if (!materials || materials.length === 0)
            return;
        const bom = await this.materialRepository.find({ where: { finishedProductId: productId } });
        const bomIds = new Set(bom.map((line) => line.rawMaterialId));
        const invalid = materials.filter((m) => !bomIds.has(m.rawMaterialId));
        if (invalid.length > 0) {
            throw new common_1.BadRequestException(`Raw material(s) ${invalid.map((m) => m.rawMaterialId).join(', ')} are not part of this product's bill of materials`);
        }
    }
    dedupeMaterials(materials) {
        const byId = new Map();
        for (const m of materials) {
            byId.set(m.rawMaterialId, (byId.get(m.rawMaterialId) ?? 0) + m.quantity);
        }
        return Array.from(byId, ([rawMaterialId, quantity]) => ({ rawMaterialId, quantity }));
    }
};
exports.WorkOrdersService = WorkOrdersService;
exports.WorkOrdersService = WorkOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_order_entity_1.WorkOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(finished_product_entity_1.FinishedProduct)),
    __param(2, (0, typeorm_1.InjectRepository)(finished_product_material_entity_1.FinishedProductMaterial)),
    __param(3, (0, typeorm_1.InjectRepository)(production_stage_entity_1.ProductionStage)),
    __param(4, (0, typeorm_1.InjectRepository)(staff_member_entity_1.StaffMember)),
    __param(5, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], WorkOrdersService);
//# sourceMappingURL=work-orders.service.js.map
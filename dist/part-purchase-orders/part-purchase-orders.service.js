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
exports.PartPurchaseOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const part_purchase_order_entity_1 = require("../entities/part-purchase-order.entity");
const part_purchase_order_item_entity_1 = require("../entities/part-purchase-order-item.entity");
const inventory_entity_1 = require("../entities/inventory.entity");
const inventory_ledger_entity_1 = require("../entities/inventory-ledger.entity");
const vendor_entity_1 = require("../entities/vendor.entity");
const vendor_ledger_entity_1 = require("../entities/vendor-ledger.entity");
let PartPurchaseOrdersService = class PartPurchaseOrdersService {
    poRepo;
    itemRepo;
    invRepo;
    invLedgerRepo;
    vendorRepo;
    vendorLedgerRepo;
    constructor(poRepo, itemRepo, invRepo, invLedgerRepo, vendorRepo, vendorLedgerRepo) {
        this.poRepo = poRepo;
        this.itemRepo = itemRepo;
        this.invRepo = invRepo;
        this.invLedgerRepo = invLedgerRepo;
        this.vendorRepo = vendorRepo;
        this.vendorLedgerRepo = vendorLedgerRepo;
    }
    findAll() {
        return this.poRepo.find({ order: { created_at: 'DESC' } });
    }
    async findOne(id) {
        const po = await this.poRepo.findOne({ where: { id } });
        if (!po)
            throw new common_1.NotFoundException(`PO ${id} not found`);
        return po;
    }
    async generatePoNumber() {
        const today = new Date();
        const prefix = `PO-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-`;
        const last = await this.poRepo
            .createQueryBuilder('po')
            .where('po.po_number LIKE :prefix', { prefix: `${prefix}%` })
            .orderBy('po.po_number', 'DESC')
            .getOne();
        const seq = last ? parseInt(last.po_number.split('-').pop() || '0', 10) + 1 : 1;
        return `${prefix}${String(seq).padStart(4, '0')}`;
    }
    async create(dto) {
        const po_number = await this.generatePoNumber();
        const subtotal = dto.items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
        const po = this.poRepo.create({
            po_number,
            vendor_id: dto.vendor_id,
            store_id: dto.store_id ?? null,
            order_date: dto.order_date,
            expected_delivery_date: dto.expected_delivery_date ?? null,
            notes: dto.notes ?? null,
            status: 'draft',
            subtotal,
            total_amount: subtotal,
        });
        const saved = await this.poRepo.save(po);
        await this.itemRepo.save(dto.items.map(i => this.itemRepo.create({
            purchase_order_id: saved.id,
            part_id: i.part_id,
            quantity: i.quantity,
            unit_price: i.unit_price,
            total_price: i.quantity * i.unit_price,
        })));
        return this.findOne(saved.id);
    }
    async updateStatus(id, status, incomingStoreId) {
        const po = await this.poRepo.findOne({ where: { id }, relations: ['items'] });
        if (!po)
            throw new common_1.NotFoundException(`PO ${id} not found`);
        const prevStatus = po.status;
        if (incomingStoreId)
            po.store_id = incomingStoreId;
        po.status = status;
        await this.poRepo.save(po);
        if (status === 'received' && prevStatus !== 'received') {
            if (!po.store_id)
                throw new common_1.BadRequestException('No store assigned — cannot receive without a store');
            for (const item of po.items) {
                let inv = await this.invRepo.findOne({
                    where: { store_id: po.store_id, part_id: item.part_id },
                });
                const prevQty = inv ? inv.quantity : 0;
                const newQty = prevQty + item.quantity;
                if (inv) {
                    inv.quantity = newQty;
                    await this.invRepo.save(inv);
                }
                else {
                    inv = await this.invRepo.save(this.invRepo.create({
                        store_id: po.store_id,
                        part_id: item.part_id,
                        quantity: newQty,
                    }));
                }
                await this.invLedgerRepo.save(this.invLedgerRepo.create({
                    inventory_id: inv.id,
                    store_id: po.store_id,
                    part_id: item.part_id,
                    transaction_type: 'IN',
                    quantity: item.quantity,
                    previous_quantity: prevQty,
                    new_quantity: newQty,
                    reference_number: po.po_number,
                    notes: `Received via PO ${po.po_number}`,
                }));
            }
            const vendor = await this.vendorRepo.findOne({ where: { id: po.vendor_id } });
            if (vendor) {
                const prevBalance = Number(vendor.current_balance ?? 0);
                const newBalance = +(prevBalance + Number(po.total_amount)).toFixed(2);
                await this.vendorLedgerRepo.save(this.vendorLedgerRepo.create({
                    vendor_id: vendor.id,
                    transaction_type: 'PURCHASE',
                    debit: Number(po.total_amount),
                    credit: 0,
                    balance: newBalance,
                    reference_number: po.po_number,
                    description: `Purchase Order ${po.po_number}`,
                    notes: po.notes ?? null,
                }));
                vendor.current_balance = newBalance;
                await this.vendorRepo.save(vendor);
            }
        }
        return this.findOne(id);
    }
    async remove(id) {
        const po = await this.findOne(id);
        await this.poRepo.remove(po);
    }
};
exports.PartPurchaseOrdersService = PartPurchaseOrdersService;
exports.PartPurchaseOrdersService = PartPurchaseOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(part_purchase_order_entity_1.PartPurchaseOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(part_purchase_order_item_entity_1.PartPurchaseOrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __param(3, (0, typeorm_1.InjectRepository)(inventory_ledger_entity_1.InventoryLedger)),
    __param(4, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(5, (0, typeorm_1.InjectRepository)(vendor_ledger_entity_1.VendorLedger)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PartPurchaseOrdersService);
//# sourceMappingURL=part-purchase-orders.service.js.map
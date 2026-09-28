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
exports.QuotationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quotation_entity_1 = require("../entities/quotation.entity");
const quotation_item_entity_1 = require("../entities/quotation-item.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const client_record_entity_1 = require("../entities/client-record.entity");
const pos_sales_service_1 = require("../pos-sales/pos-sales.service");
const RELATIONS = ['items', 'items.product', 'client', 'createdByStaff', 'convertedSale'];
let QuotationsService = class QuotationsService {
    quotationRepository;
    productRepository;
    clientRepository;
    dataSource;
    posSalesService;
    constructor(quotationRepository, productRepository, clientRepository, dataSource, posSalesService) {
        this.quotationRepository = quotationRepository;
        this.productRepository = productRepository;
        this.clientRepository = clientRepository;
        this.dataSource = dataSource;
        this.posSalesService = posSalesService;
    }
    redactStaff(quotation) {
        if (quotation.createdByStaff) {
            quotation.createdByStaff = { id: quotation.createdByStaff.id, name: quotation.createdByStaff.name };
        }
        return quotation;
    }
    async findAll() {
        const quotations = await this.quotationRepository.find({
            relations: RELATIONS,
            order: { createdAt: 'DESC' },
        });
        return quotations.map((q) => this.redactStaff(q));
    }
    async findOne(id) {
        const quotation = await this.quotationRepository.findOne({ where: { id }, relations: RELATIONS });
        if (!quotation) {
            throw new common_1.NotFoundException(`Quotation with ID ${id} not found`);
        }
        return this.redactStaff(quotation);
    }
    async validateReferences(dto) {
        const productIds = dto.items.map((i) => i.productId);
        const [products, client] = await Promise.all([
            this.productRepository.find({ where: { id: (0, typeorm_2.In)(productIds) } }),
            dto.clientId != null ? this.clientRepository.findOne({ where: { id: dto.clientId } }) : Promise.resolve(null),
        ]);
        const productMap = new Map(products.map((p) => [p.id, p]));
        for (const item of dto.items) {
            if (!productMap.has(item.productId)) {
                throw new common_1.NotFoundException(`Finished product with ID ${item.productId} not found`);
            }
        }
        if (dto.clientId != null && !client) {
            throw new common_1.NotFoundException(`Client with ID ${dto.clientId} not found`);
        }
    }
    async create(dto, createdBy) {
        await this.validateReferences(dto);
        const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
        const taxRate = dto.taxRate ?? 16;
        const taxAmount = subtotal * (taxRate / 100);
        const totalAmount = subtotal + taxAmount;
        const savedId = await this.dataSource.transaction(async (manager) => {
            const quotation = manager.create(quotation_entity_1.Quotation, {
                clientId: dto.clientId ?? null,
                subtotal,
                taxRate,
                taxAmount,
                totalAmount,
                validUntil: dto.validUntil ?? null,
                notes: dto.notes ?? null,
                createdBy,
            });
            const savedQuotation = await manager.save(quotation_entity_1.Quotation, quotation);
            const items = dto.items.map((i) => manager.create(quotation_item_entity_1.QuotationItem, {
                quotationId: savedQuotation.id,
                productId: i.productId,
                quantity: i.quantity,
                unitPrice: i.unitPrice,
                totalPrice: i.quantity * i.unitPrice,
            }));
            await manager.save(quotation_item_entity_1.QuotationItem, items);
            return savedQuotation.id;
        });
        return this.findOne(savedId);
    }
    async update(id, dto) {
        const existing = await this.quotationRepository.findOne({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException(`Quotation with ID ${id} not found`);
        }
        if (existing.convertedSaleId != null) {
            throw new common_1.ConflictException('This quotation has already been converted to an invoice and can no longer be edited');
        }
        await this.validateReferences(dto);
        const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
        const taxRate = dto.taxRate ?? 16;
        const taxAmount = subtotal * (taxRate / 100);
        const totalAmount = subtotal + taxAmount;
        await this.dataSource.transaction(async (manager) => {
            await manager.update(quotation_entity_1.Quotation, id, {
                clientId: dto.clientId ?? null,
                subtotal,
                taxRate,
                taxAmount,
                totalAmount,
                validUntil: dto.validUntil ?? null,
                notes: dto.notes ?? null,
            });
            await manager.delete(quotation_item_entity_1.QuotationItem, { quotationId: id });
            const items = dto.items.map((i) => manager.create(quotation_item_entity_1.QuotationItem, {
                quotationId: id,
                productId: i.productId,
                quantity: i.quantity,
                unitPrice: i.unitPrice,
                totalPrice: i.quantity * i.unitPrice,
            }));
            await manager.save(quotation_item_entity_1.QuotationItem, items);
        });
        return this.findOne(id);
    }
    async remove(id) {
        const quotation = await this.quotationRepository.findOne({ where: { id } });
        if (!quotation) {
            throw new common_1.NotFoundException(`Quotation with ID ${id} not found`);
        }
        if (quotation.convertedSaleId != null) {
            throw new common_1.ConflictException('This quotation has already been converted to an invoice and can no longer be deleted');
        }
        await this.quotationRepository.remove(quotation);
    }
    async convertToInvoice(id, storeId, createdBy) {
        const quotation = await this.quotationRepository.findOne({ where: { id }, relations: ['items'] });
        if (!quotation) {
            throw new common_1.NotFoundException(`Quotation with ID ${id} not found`);
        }
        if (quotation.convertedSaleId != null) {
            throw new common_1.ConflictException('This quotation has already been converted to an invoice');
        }
        const sale = await this.posSalesService.create({
            clientId: quotation.clientId ?? undefined,
            storeId,
            items: quotation.items.map((i) => ({
                productId: i.productId,
                quantity: Number(i.quantity),
                unitPrice: Number(i.unitPrice),
            })),
            taxRate: Number(quotation.taxRate),
        }, createdBy);
        await this.quotationRepository.update(id, { convertedSaleId: sale.id });
        return { quotation: await this.findOne(id), sale };
    }
};
exports.QuotationsService = QuotationsService;
exports.QuotationsService = QuotationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quotation_entity_1.Quotation)),
    __param(1, (0, typeorm_1.InjectRepository)(finished_product_entity_1.FinishedProduct)),
    __param(2, (0, typeorm_1.InjectRepository)(client_record_entity_1.ClientRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        pos_sales_service_1.PosSalesService])
], QuotationsService);
//# sourceMappingURL=quotations.service.js.map
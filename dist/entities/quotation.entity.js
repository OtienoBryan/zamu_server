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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quotation = void 0;
const typeorm_1 = require("typeorm");
const quotation_item_entity_1 = require("./quotation-item.entity");
const client_record_entity_1 = require("./client-record.entity");
const staff_entity_1 = require("./staff.entity");
const pos_sale_entity_1 = require("./pos-sale.entity");
let Quotation = class Quotation {
    id;
    clientId;
    client;
    subtotal;
    taxRate;
    taxAmount;
    totalAmount;
    validUntil;
    notes;
    convertedSaleId;
    convertedSale;
    createdBy;
    createdByStaff;
    createdAt;
    updatedAt;
    items;
};
exports.Quotation = Quotation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Quotation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_record_entity_1.ClientRecord),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", Object)
], Quotation.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "taxRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_amount', type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_until', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "validUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'converted_sale_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "convertedSaleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pos_sale_entity_1.PosSale),
    (0, typeorm_1.JoinColumn)({ name: 'converted_sale_id' }),
    __metadata("design:type", Object)
], Quotation.prototype, "convertedSale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", Object)
], Quotation.prototype, "createdByStaff", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Quotation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Quotation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quotation_item_entity_1.QuotationItem, (item) => item.quotation),
    __metadata("design:type", Array)
], Quotation.prototype, "items", void 0);
exports.Quotation = Quotation = __decorate([
    (0, typeorm_1.Entity)('quotations')
], Quotation);
//# sourceMappingURL=quotation.entity.js.map
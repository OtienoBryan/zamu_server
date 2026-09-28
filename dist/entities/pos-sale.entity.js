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
exports.PosSale = void 0;
const typeorm_1 = require("typeorm");
const pos_sale_item_entity_1 = require("./pos-sale-item.entity");
const client_record_entity_1 = require("./client-record.entity");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const staff_entity_1 = require("./staff.entity");
let PosSale = class PosSale {
    id;
    clientId;
    client;
    storeId;
    store;
    subtotal;
    taxRate;
    taxAmount;
    totalAmount;
    createdBy;
    postedByStaff;
    createdAt;
    updatedAt;
    items;
};
exports.PosSale = PosSale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PosSale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], PosSale.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_record_entity_1.ClientRecord),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", Object)
], PosSale.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], PosSale.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", Object)
], PosSale.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PosSale.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PosSale.prototype, "taxRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_amount', type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PosSale.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PosSale.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], PosSale.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", Object)
], PosSale.prototype, "postedByStaff", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PosSale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PosSale.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pos_sale_item_entity_1.PosSaleItem, (item) => item.sale),
    __metadata("design:type", Array)
], PosSale.prototype, "items", void 0);
exports.PosSale = PosSale = __decorate([
    (0, typeorm_1.Entity)('pos_sales')
], PosSale);
//# sourceMappingURL=pos-sale.entity.js.map
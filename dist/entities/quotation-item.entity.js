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
exports.QuotationItem = void 0;
const typeorm_1 = require("typeorm");
const quotation_entity_1 = require("./quotation.entity");
const finished_product_entity_1 = require("./finished-product.entity");
let QuotationItem = class QuotationItem {
    id;
    quotationId;
    quotation;
    productId;
    product;
    quantity;
    unitPrice;
    totalPrice;
};
exports.QuotationItem = QuotationItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuotationItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quotation_id' }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "quotationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quotation_entity_1.Quotation, (quotation) => quotation.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'quotation_id' }),
    __metadata("design:type", quotation_entity_1.Quotation)
], QuotationItem.prototype, "quotation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => finished_product_entity_1.FinishedProduct),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", finished_product_entity_1.FinishedProduct)
], QuotationItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_price', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "totalPrice", void 0);
exports.QuotationItem = QuotationItem = __decorate([
    (0, typeorm_1.Entity)('quotation_items')
], QuotationItem);
//# sourceMappingURL=quotation-item.entity.js.map
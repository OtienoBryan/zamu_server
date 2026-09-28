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
exports.ConversionClient = void 0;
const typeorm_1 = require("typeorm");
let ConversionClient = class ConversionClient {
    id;
    name;
    first_name;
    middle_name;
    surname;
    email;
    contact;
    account_number;
    address;
    description;
    region;
    category;
    organization_type;
    organization_name;
    tax_pin;
    referral_source;
    referral_notes;
    tax_exempt;
    apply_discount;
    discount_rate;
    labour_rate_override;
    labour_rate;
    parts_markup_override;
    parts_markup;
    payment_terms_override;
    payment_terms;
    is_active;
    created_at;
    updated_at;
};
exports.ConversionClient = ConversionClient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConversionClient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ConversionClient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "middle_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ConversionClient.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], ConversionClient.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 191, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['individual', 'company'], default: 'individual' }),
    __metadata("design:type", String)
], ConversionClient.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['individual', 'sacco', 'company'], nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "organization_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "organization_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "tax_pin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "referral_source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "referral_notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Number)
], ConversionClient.prototype, "tax_exempt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Number)
], ConversionClient.prototype, "apply_discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "discount_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Number)
], ConversionClient.prototype, "labour_rate_override", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "labour_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Number)
], ConversionClient.prototype, "parts_markup_override", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "parts_markup", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Number)
], ConversionClient.prototype, "payment_terms_override", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ConversionClient.prototype, "payment_terms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ConversionClient.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ConversionClient.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ConversionClient.prototype, "updated_at", void 0);
exports.ConversionClient = ConversionClient = __decorate([
    (0, typeorm_1.Entity)('conversion_clients')
], ConversionClient);
//# sourceMappingURL=conversion-client.entity.js.map
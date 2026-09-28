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
exports.JobCard = void 0;
const typeorm_1 = require("typeorm");
const conversion_client_entity_1 = require("./conversion-client.entity");
const conversion_vehicle_entity_1 = require("./conversion-vehicle.entity");
const job_card_item_entity_1 = require("./job-card-item.entity");
let JobCard = class JobCard {
    id;
    conversion_client_id;
    conversionClient;
    conversion_vehicle_id;
    conversionVehicle;
    status;
    vat_enabled;
    vat_rate;
    discount;
    other_charges;
    amount_paid;
    notes;
    items;
    created_at;
    updated_at;
};
exports.JobCard = JobCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_client_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], JobCard.prototype, "conversion_client_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_client_entity_1.ConversionClient),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_client_id' }),
    __metadata("design:type", conversion_client_entity_1.ConversionClient)
], JobCard.prototype, "conversionClient", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_vehicle_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], JobCard.prototype, "conversion_vehicle_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_vehicle_entity_1.ConversionVehicle),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_vehicle_id' }),
    __metadata("design:type", conversion_vehicle_entity_1.ConversionVehicle)
], JobCard.prototype, "conversionVehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['open', 'sent', 'approved', 'not_paid', 'paid', 'warranty', 'special_order', 'written_off', 'voided'],
        default: 'open',
    }),
    __metadata("design:type", String)
], JobCard.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], JobCard.prototype, "vat_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 16, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCard.prototype, "vat_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCard.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCard.prototype, "other_charges", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCard.prototype, "amount_paid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JobCard.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_card_item_entity_1.JobCardItem, item => item.jobCard, { cascade: true }),
    __metadata("design:type", Array)
], JobCard.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobCard.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], JobCard.prototype, "updated_at", void 0);
exports.JobCard = JobCard = __decorate([
    (0, typeorm_1.Entity)('job_cards')
], JobCard);
//# sourceMappingURL=job-card.entity.js.map
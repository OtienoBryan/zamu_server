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
exports.SparePartInventoryLedger = void 0;
const typeorm_1 = require("typeorm");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const spare_part_entity_1 = require("./spare-part.entity");
let SparePartInventoryLedger = class SparePartInventoryLedger {
    id;
    storeId;
    store;
    sparePartId;
    sparePart;
    transactionType;
    quantity;
    previousQuantity;
    newQuantity;
    notes;
    createdBy;
    createdAt;
};
exports.SparePartInventoryLedger = SparePartInventoryLedger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SparePartInventoryLedger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id' }),
    __metadata("design:type", Number)
], SparePartInventoryLedger.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", raw_material_store_entity_1.RawMaterialStore)
], SparePartInventoryLedger.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'spare_part_id' }),
    __metadata("design:type", Number)
], SparePartInventoryLedger.prototype, "sparePartId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => spare_part_entity_1.SparePart),
    (0, typeorm_1.JoinColumn)({ name: 'spare_part_id' }),
    __metadata("design:type", spare_part_entity_1.SparePart)
], SparePartInventoryLedger.prototype, "sparePart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'transaction_type',
        type: 'enum',
        enum: ['adjustment_in', 'adjustment_out', 'transfer_in', 'transfer_out'],
    }),
    __metadata("design:type", String)
], SparePartInventoryLedger.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SparePartInventoryLedger.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_quantity', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SparePartInventoryLedger.prototype, "previousQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_quantity', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SparePartInventoryLedger.prototype, "newQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SparePartInventoryLedger.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], SparePartInventoryLedger.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SparePartInventoryLedger.prototype, "createdAt", void 0);
exports.SparePartInventoryLedger = SparePartInventoryLedger = __decorate([
    (0, typeorm_1.Entity)('spare_part_inventory_ledger')
], SparePartInventoryLedger);
//# sourceMappingURL=spare-part-inventory-ledger.entity.js.map
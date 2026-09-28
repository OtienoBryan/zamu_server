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
exports.InventoryLedger = void 0;
const typeorm_1 = require("typeorm");
const inventory_entity_1 = require("./inventory.entity");
const station_entity_1 = require("./station.entity");
const part_entity_1 = require("./part.entity");
const inventory_transaction_dto_1 = require("../inventory/dto/inventory-transaction.dto");
let InventoryLedger = class InventoryLedger {
    id;
    inventory_id;
    store_id;
    part_id;
    transaction_type;
    quantity;
    previous_quantity;
    new_quantity;
    reference_number;
    notes;
    created_by;
    created_at;
    inventory;
    store;
    part;
};
exports.InventoryLedger = InventoryLedger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventoryLedger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inventory_id', type: 'int' }),
    __metadata("design:type", Number)
], InventoryLedger.prototype, "inventory_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'int' }),
    __metadata("design:type", Number)
], InventoryLedger.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'part_id', type: 'int' }),
    __metadata("design:type", Number)
], InventoryLedger.prototype, "part_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'transaction_type',
        type: 'enum',
        enum: ['IN', 'OUT', 'ADJUSTMENT', 'TRANSFER_IN', 'TRANSFER_OUT']
    }),
    __metadata("design:type", String)
], InventoryLedger.prototype, "transaction_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], InventoryLedger.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_quantity', type: 'int' }),
    __metadata("design:type", Number)
], InventoryLedger.prototype, "previous_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_quantity', type: 'int' }),
    __metadata("design:type", Number)
], InventoryLedger.prototype, "new_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_number', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], InventoryLedger.prototype, "reference_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], InventoryLedger.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], InventoryLedger.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], InventoryLedger.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_entity_1.Inventory),
    (0, typeorm_1.JoinColumn)({ name: 'inventory_id' }),
    __metadata("design:type", inventory_entity_1.Inventory)
], InventoryLedger.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", station_entity_1.Station)
], InventoryLedger.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => part_entity_1.Part),
    (0, typeorm_1.JoinColumn)({ name: 'part_id' }),
    __metadata("design:type", part_entity_1.Part)
], InventoryLedger.prototype, "part", void 0);
exports.InventoryLedger = InventoryLedger = __decorate([
    (0, typeorm_1.Entity)('parts_inventory_ledger')
], InventoryLedger);
//# sourceMappingURL=inventory-ledger.entity.js.map
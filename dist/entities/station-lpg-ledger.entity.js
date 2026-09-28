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
exports.StationLpgLedger = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
const staff_entity_1 = require("./staff.entity");
const decimal = {
    to: (value) => value,
    from: (value) => (value === null ? 0 : parseFloat(value)),
};
let StationLpgLedger = class StationLpgLedger {
    id;
    stationId;
    station;
    transactionType;
    quantityIn;
    quantityOut;
    balance;
    quantity;
    previousQuantity;
    newQuantity;
    referenceNumber;
    notes;
    createdBy;
    createdByStaff;
    created_at;
};
exports.StationLpgLedger = StationLpgLedger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stationId', type: 'int' }),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station),
    (0, typeorm_1.JoinColumn)({ name: 'stationId' }),
    __metadata("design:type", station_entity_1.Station)
], StationLpgLedger.prototype, "station", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transactionType', type: 'enum', enum: ['IN', 'OUT', 'ADJUSTMENT'] }),
    __metadata("design:type", String)
], StationLpgLedger.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantityIn', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0, transformer: decimal }),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "quantityIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantityOut', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0, transformer: decimal }),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "quantityOut", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: decimal }),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: decimal }),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previousQuantity', type: 'decimal', precision: 10, scale: 2, default: 0, transformer: decimal }),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "previousQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'newQuantity', type: 'decimal', precision: 10, scale: 2, transformer: decimal }),
    __metadata("design:type", Number)
], StationLpgLedger.prototype, "newQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'referenceNumber', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], StationLpgLedger.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StationLpgLedger.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdBy', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], StationLpgLedger.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy' }),
    __metadata("design:type", staff_entity_1.Staff)
], StationLpgLedger.prototype, "createdByStaff", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], StationLpgLedger.prototype, "created_at", void 0);
exports.StationLpgLedger = StationLpgLedger = __decorate([
    (0, typeorm_1.Entity)('InventoryLedger')
], StationLpgLedger);
//# sourceMappingURL=station-lpg-ledger.entity.js.map
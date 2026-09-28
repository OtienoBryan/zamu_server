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
exports.StationTank = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
const decimal = {
    to: (value) => value,
    from: (value) => (value === null ? 0 : parseFloat(value)),
};
let StationTank = class StationTank {
    id;
    station_id;
    station;
    name;
    capacity;
    current_quantity;
    status;
    created_at;
    updated_at;
};
exports.StationTank = StationTank;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StationTank.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'station_id', type: 'int' }),
    __metadata("design:type", Number)
], StationTank.prototype, "station_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station),
    (0, typeorm_1.JoinColumn)({ name: 'station_id' }),
    __metadata("design:type", station_entity_1.Station)
], StationTank.prototype, "station", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], StationTank.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: decimal }),
    __metadata("design:type", Number)
], StationTank.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_quantity', type: 'decimal', precision: 10, scale: 2, default: 0, transformer: decimal }),
    __metadata("design:type", Number)
], StationTank.prototype, "current_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['active', 'inactive', 'maintenance'], default: 'active' }),
    __metadata("design:type", String)
], StationTank.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StationTank.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StationTank.prototype, "updated_at", void 0);
exports.StationTank = StationTank = __decorate([
    (0, typeorm_1.Entity)('station_tanks')
], StationTank);
//# sourceMappingURL=station-tank.entity.js.map
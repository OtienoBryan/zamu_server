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
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
const part_entity_1 = require("./part.entity");
let Inventory = class Inventory {
    id;
    store_id;
    part_id;
    quantity;
    min_stock_level;
    location;
    last_updated;
    store;
    part;
};
exports.Inventory = Inventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'int' }),
    __metadata("design:type", Number)
], Inventory.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'part_id', type: 'int' }),
    __metadata("design:type", Number)
], Inventory.prototype, "part_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_stock_level', type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Object)
], Inventory.prototype, "min_stock_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'last_updated', type: 'timestamp' }),
    __metadata("design:type", Date)
], Inventory.prototype, "last_updated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", station_entity_1.Station)
], Inventory.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => part_entity_1.Part),
    (0, typeorm_1.JoinColumn)({ name: 'part_id' }),
    __metadata("design:type", part_entity_1.Part)
], Inventory.prototype, "part", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)('parts_inventory')
], Inventory);
//# sourceMappingURL=inventory.entity.js.map
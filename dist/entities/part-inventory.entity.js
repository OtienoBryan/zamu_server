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
exports.PartInventory = void 0;
const typeorm_1 = require("typeorm");
const part_entity_1 = require("./part.entity");
let PartInventory = class PartInventory {
    id;
    store_id;
    part_id;
    part;
    quantity;
    min_stock_level;
    location;
    last_updated;
};
exports.PartInventory = PartInventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PartInventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'int' }),
    __metadata("design:type", Number)
], PartInventory.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'part_id', type: 'int' }),
    __metadata("design:type", Number)
], PartInventory.prototype, "part_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => part_entity_1.Part),
    (0, typeorm_1.JoinColumn)({ name: 'part_id' }),
    __metadata("design:type", part_entity_1.Part)
], PartInventory.prototype, "part", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PartInventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Object)
], PartInventory.prototype, "min_stock_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], PartInventory.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'last_updated' }),
    __metadata("design:type", Date)
], PartInventory.prototype, "last_updated", void 0);
exports.PartInventory = PartInventory = __decorate([
    (0, typeorm_1.Entity)('parts_inventory')
], PartInventory);
//# sourceMappingURL=part-inventory.entity.js.map
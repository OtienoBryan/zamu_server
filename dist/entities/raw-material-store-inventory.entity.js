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
exports.RawMaterialStoreInventory = void 0;
const typeorm_1 = require("typeorm");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const raw_material_entity_1 = require("./raw-material.entity");
let RawMaterialStoreInventory = class RawMaterialStoreInventory {
    id;
    storeId;
    store;
    rawMaterialId;
    rawMaterial;
    quantity;
    updatedAt;
};
exports.RawMaterialStoreInventory = RawMaterialStoreInventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RawMaterialStoreInventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id' }),
    __metadata("design:type", Number)
], RawMaterialStoreInventory.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", raw_material_store_entity_1.RawMaterialStore)
], RawMaterialStoreInventory.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_material_id' }),
    __metadata("design:type", Number)
], RawMaterialStoreInventory.prototype, "rawMaterialId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_entity_1.RawMaterial),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", raw_material_entity_1.RawMaterial)
], RawMaterialStoreInventory.prototype, "rawMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RawMaterialStoreInventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RawMaterialStoreInventory.prototype, "updatedAt", void 0);
exports.RawMaterialStoreInventory = RawMaterialStoreInventory = __decorate([
    (0, typeorm_1.Entity)('raw_material_store_inventory')
], RawMaterialStoreInventory);
//# sourceMappingURL=raw-material-store-inventory.entity.js.map
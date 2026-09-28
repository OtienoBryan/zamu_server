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
exports.Machine = void 0;
const typeorm_1 = require("typeorm");
const machine_category_entity_1 = require("./machine-category.entity");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
let Machine = class Machine {
    id;
    name;
    machineCode;
    serialNumber;
    categoryId;
    category;
    storeId;
    store;
    maintenanceIntervalDays;
    description;
    status;
    createdAt;
    updatedAt;
};
exports.Machine = Machine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Machine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Machine.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'machine_code', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Machine.prototype, "machineCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'serial_number', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Machine.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', nullable: true }),
    __metadata("design:type", Object)
], Machine.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => machine_category_entity_1.MachineCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Object)
], Machine.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', nullable: true }),
    __metadata("design:type", Object)
], Machine.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", Object)
], Machine.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maintenance_interval_days', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Machine.prototype, "maintenanceIntervalDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Machine.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['active', 'inactive', 'in_repair'], default: 'active' }),
    __metadata("design:type", String)
], Machine.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Machine.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Machine.prototype, "updatedAt", void 0);
exports.Machine = Machine = __decorate([
    (0, typeorm_1.Entity)('machines')
], Machine);
//# sourceMappingURL=machine.entity.js.map
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
exports.MachineServiceRecord = void 0;
const typeorm_1 = require("typeorm");
const machine_entity_1 = require("./machine.entity");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const machine_service_part_entity_1 = require("./machine-service-part.entity");
const machine_service_worker_entity_1 = require("./machine-service-worker.entity");
let MachineServiceRecord = class MachineServiceRecord {
    id;
    machineId;
    machine;
    storeId;
    store;
    startAt;
    endAt;
    description;
    createdBy;
    createdAt;
    updatedAt;
    parts;
    workers;
};
exports.MachineServiceRecord = MachineServiceRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MachineServiceRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'machine_id' }),
    __metadata("design:type", Number)
], MachineServiceRecord.prototype, "machineId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => machine_entity_1.Machine, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'machine_id' }),
    __metadata("design:type", machine_entity_1.Machine)
], MachineServiceRecord.prototype, "machine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', nullable: true }),
    __metadata("design:type", Object)
], MachineServiceRecord.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", Object)
], MachineServiceRecord.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_at', type: 'datetime' }),
    __metadata("design:type", Date)
], MachineServiceRecord.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_at', type: 'datetime' }),
    __metadata("design:type", Date)
], MachineServiceRecord.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MachineServiceRecord.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], MachineServiceRecord.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MachineServiceRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], MachineServiceRecord.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => machine_service_part_entity_1.MachineServicePart, (part) => part.serviceRecord),
    __metadata("design:type", Array)
], MachineServiceRecord.prototype, "parts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => machine_service_worker_entity_1.MachineServiceWorker, (worker) => worker.serviceRecord),
    __metadata("design:type", Array)
], MachineServiceRecord.prototype, "workers", void 0);
exports.MachineServiceRecord = MachineServiceRecord = __decorate([
    (0, typeorm_1.Entity)('machine_service_records')
], MachineServiceRecord);
//# sourceMappingURL=machine-service-record.entity.js.map
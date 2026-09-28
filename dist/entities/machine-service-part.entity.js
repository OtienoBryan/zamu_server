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
exports.MachineServicePart = void 0;
const typeorm_1 = require("typeorm");
const machine_service_record_entity_1 = require("./machine-service-record.entity");
const spare_part_entity_1 = require("./spare-part.entity");
let MachineServicePart = class MachineServicePart {
    id;
    serviceRecordId;
    serviceRecord;
    sparePartId;
    sparePart;
    quantity;
    createdAt;
};
exports.MachineServicePart = MachineServicePart;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MachineServicePart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_record_id' }),
    __metadata("design:type", Number)
], MachineServicePart.prototype, "serviceRecordId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => machine_service_record_entity_1.MachineServiceRecord, (record) => record.parts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'service_record_id' }),
    __metadata("design:type", machine_service_record_entity_1.MachineServiceRecord)
], MachineServicePart.prototype, "serviceRecord", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'spare_part_id' }),
    __metadata("design:type", Number)
], MachineServicePart.prototype, "sparePartId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => spare_part_entity_1.SparePart),
    (0, typeorm_1.JoinColumn)({ name: 'spare_part_id' }),
    __metadata("design:type", spare_part_entity_1.SparePart)
], MachineServicePart.prototype, "sparePart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], MachineServicePart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MachineServicePart.prototype, "createdAt", void 0);
exports.MachineServicePart = MachineServicePart = __decorate([
    (0, typeorm_1.Entity)('machine_service_parts')
], MachineServicePart);
//# sourceMappingURL=machine-service-part.entity.js.map
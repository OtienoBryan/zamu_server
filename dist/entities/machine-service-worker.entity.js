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
exports.MachineServiceWorker = void 0;
const typeorm_1 = require("typeorm");
const machine_service_record_entity_1 = require("./machine-service-record.entity");
const staff_member_entity_1 = require("./staff-member.entity");
let MachineServiceWorker = class MachineServiceWorker {
    id;
    serviceRecordId;
    serviceRecord;
    staffMemberId;
    staffMember;
    createdAt;
};
exports.MachineServiceWorker = MachineServiceWorker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MachineServiceWorker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_record_id' }),
    __metadata("design:type", Number)
], MachineServiceWorker.prototype, "serviceRecordId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => machine_service_record_entity_1.MachineServiceRecord, (record) => record.workers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'service_record_id' }),
    __metadata("design:type", machine_service_record_entity_1.MachineServiceRecord)
], MachineServiceWorker.prototype, "serviceRecord", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_member_id' }),
    __metadata("design:type", Number)
], MachineServiceWorker.prototype, "staffMemberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_member_entity_1.StaffMember),
    (0, typeorm_1.JoinColumn)({ name: 'staff_member_id' }),
    __metadata("design:type", staff_member_entity_1.StaffMember)
], MachineServiceWorker.prototype, "staffMember", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MachineServiceWorker.prototype, "createdAt", void 0);
exports.MachineServiceWorker = MachineServiceWorker = __decorate([
    (0, typeorm_1.Entity)('machine_service_workers')
], MachineServiceWorker);
//# sourceMappingURL=machine-service-worker.entity.js.map
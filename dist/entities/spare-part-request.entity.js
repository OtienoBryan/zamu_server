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
exports.SparePartRequest = void 0;
const typeorm_1 = require("typeorm");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const spare_part_request_item_entity_1 = require("./spare-part-request-item.entity");
const machine_entity_1 = require("./machine.entity");
const staff_member_entity_1 = require("./staff-member.entity");
let SparePartRequest = class SparePartRequest {
    id;
    storeId;
    store;
    machineId;
    machine;
    staffMemberId;
    staffMember;
    status;
    requestedBy;
    notes;
    fulfilledAt;
    fulfillmentNotes;
    items;
    createdAt;
    updatedAt;
};
exports.SparePartRequest = SparePartRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SparePartRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id' }),
    __metadata("design:type", Number)
], SparePartRequest.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", raw_material_store_entity_1.RawMaterialStore)
], SparePartRequest.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'machine_id', nullable: true }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "machineId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => machine_entity_1.Machine),
    (0, typeorm_1.JoinColumn)({ name: 'machine_id' }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "machine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_member_id', nullable: true }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "staffMemberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_member_entity_1.StaffMember),
    (0, typeorm_1.JoinColumn)({ name: 'staff_member_id' }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "staffMember", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'fulfilled', 'cancelled'], default: 'pending' }),
    __metadata("design:type", String)
], SparePartRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "requestedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fulfilled_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "fulfilledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fulfillment_notes', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SparePartRequest.prototype, "fulfillmentNotes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => spare_part_request_item_entity_1.SparePartRequestItem, (item) => item.request, { cascade: true }),
    __metadata("design:type", Array)
], SparePartRequest.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SparePartRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SparePartRequest.prototype, "updatedAt", void 0);
exports.SparePartRequest = SparePartRequest = __decorate([
    (0, typeorm_1.Entity)('spare_part_requests')
], SparePartRequest);
//# sourceMappingURL=spare-part-request.entity.js.map
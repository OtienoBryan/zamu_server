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
exports.VehicleInspection = void 0;
const typeorm_1 = require("typeorm");
const conversion_vehicle_entity_1 = require("./conversion-vehicle.entity");
const conversion_client_entity_1 = require("./conversion-client.entity");
const staff_entity_1 = require("./staff.entity");
let VehicleInspection = class VehicleInspection {
    id;
    conversion_vehicle_id;
    conversionVehicle;
    conversion_client_id;
    conversionClient;
    assigned_staff_id;
    technician;
    inspection_date;
    status;
    summary;
    checklist;
    issues_found;
    created_at;
    updated_at;
};
exports.VehicleInspection = VehicleInspection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VehicleInspection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_vehicle_id', type: 'int' }),
    __metadata("design:type", Number)
], VehicleInspection.prototype, "conversion_vehicle_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_vehicle_entity_1.ConversionVehicle),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_vehicle_id' }),
    __metadata("design:type", conversion_vehicle_entity_1.ConversionVehicle)
], VehicleInspection.prototype, "conversionVehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_client_id', type: 'int' }),
    __metadata("design:type", Number)
], VehicleInspection.prototype, "conversion_client_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_client_entity_1.ConversionClient),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_client_id' }),
    __metadata("design:type", conversion_client_entity_1.ConversionClient)
], VehicleInspection.prototype, "conversionClient", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_staff_id', type: 'int' }),
    __metadata("design:type", Number)
], VehicleInspection.prototype, "assigned_staff_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_staff_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], VehicleInspection.prototype, "technician", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], VehicleInspection.prototype, "inspection_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'in_progress', 'completed'], default: 'pending' }),
    __metadata("design:type", String)
], VehicleInspection.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], VehicleInspection.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", Object)
], VehicleInspection.prototype, "checklist", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VehicleInspection.prototype, "issues_found", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], VehicleInspection.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], VehicleInspection.prototype, "updated_at", void 0);
exports.VehicleInspection = VehicleInspection = __decorate([
    (0, typeorm_1.Entity)('inspections')
], VehicleInspection);
//# sourceMappingURL=vehicle-inspection.entity.js.map
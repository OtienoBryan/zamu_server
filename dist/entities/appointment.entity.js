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
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const conversion_client_entity_1 = require("./conversion-client.entity");
const conversion_vehicle_entity_1 = require("./conversion-vehicle.entity");
let Appointment = class Appointment {
    id;
    title;
    description;
    location;
    appointment_date;
    end_date;
    conversion_client_id;
    conversionClient;
    conversion_vehicle_id;
    conversionVehicle;
    status;
    created_by;
    created_at;
    updated_at;
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Appointment.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Appointment.prototype, "appointment_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_client_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "conversion_client_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_client_entity_1.ConversionClient),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_client_id' }),
    __metadata("design:type", conversion_client_entity_1.ConversionClient)
], Appointment.prototype, "conversionClient", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_vehicle_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "conversion_vehicle_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_vehicle_entity_1.ConversionVehicle),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_vehicle_id' }),
    __metadata("design:type", conversion_vehicle_entity_1.ConversionVehicle)
], Appointment.prototype, "conversionVehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Appointment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Appointment.prototype, "updated_at", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)('appointments')
], Appointment);
//# sourceMappingURL=appointment.entity.js.map
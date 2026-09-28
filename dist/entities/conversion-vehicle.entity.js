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
exports.ConversionVehicle = void 0;
const typeorm_1 = require("typeorm");
const conversion_client_entity_1 = require("./conversion-client.entity");
let ConversionVehicle = class ConversionVehicle {
    id;
    conversion_client_id;
    conversionClient;
    registration_number;
    vin_serial_number;
    vehicle_type;
    year;
    make;
    model;
    trim_option;
    transmission_type;
    driven_wheel;
    engine;
    engine_capacity;
    engine_code;
    current_odo;
    odo_unit;
    color;
    unit_number;
    tank_capacity;
    tank_year_of_production;
    tank_serial_number;
    kit_serial_number;
    telemetry_status;
    notes;
    photo_url;
    vsa_url;
    logbook_url;
    documents;
    photo_urls;
    labels;
    created_at;
    updated_at;
};
exports.ConversionVehicle = ConversionVehicle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConversionVehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_client_id', type: 'int' }),
    __metadata("design:type", Number)
], ConversionVehicle.prototype, "conversion_client_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_client_entity_1.ConversionClient),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_client_id' }),
    __metadata("design:type", conversion_client_entity_1.ConversionClient)
], ConversionVehicle.prototype, "conversionClient", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "registration_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "vin_serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "vehicle_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ConversionVehicle.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "make", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "trim_option", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "transmission_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "driven_wheel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "engine", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "engine_capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "engine_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ConversionVehicle.prototype, "current_odo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['KM', 'Miles'], default: 'KM' }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "odo_unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "unit_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "tank_capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ConversionVehicle.prototype, "tank_year_of_production", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "tank_serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "kit_serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "telemetry_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ConversionVehicle.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], ConversionVehicle.prototype, "photo_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], ConversionVehicle.prototype, "vsa_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], ConversionVehicle.prototype, "logbook_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        transformer: {
            to: (value) => (value && value.length ? JSON.stringify(value) : null),
            from: (value) => {
                if (!value)
                    return [];
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed) ? parsed : [];
                }
                catch {
                    return [];
                }
            },
        },
    }),
    __metadata("design:type", Array)
], ConversionVehicle.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        transformer: {
            to: (value) => (value && value.length ? JSON.stringify(value) : null),
            from: (value) => {
                if (!value)
                    return [];
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed) ? parsed : [];
                }
                catch {
                    return [];
                }
            },
        },
    }),
    __metadata("design:type", Array)
], ConversionVehicle.prototype, "photo_urls", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        transformer: {
            to: (value) => (value && value.length ? JSON.stringify(value) : null),
            from: (value) => {
                if (!value)
                    return [];
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed) ? parsed : [];
                }
                catch {
                    return [];
                }
            },
        },
    }),
    __metadata("design:type", Array)
], ConversionVehicle.prototype, "labels", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ConversionVehicle.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ConversionVehicle.prototype, "updated_at", void 0);
exports.ConversionVehicle = ConversionVehicle = __decorate([
    (0, typeorm_1.Entity)('conversion_vehicles')
], ConversionVehicle);
//# sourceMappingURL=conversion-vehicle.entity.js.map
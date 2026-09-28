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
exports.Staff = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("./department.entity");
const station_entity_1 = require("./station.entity");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
let Staff = class Staff {
    id;
    name;
    photo_url;
    empl_no;
    id_no;
    role;
    store_id;
    store;
    designation;
    phone_number;
    password;
    cash_balance;
    department;
    department_id;
    department_relation;
    business_email;
    department_email;
    salary;
    employment_type;
    gender;
    station_id;
    station;
    pump_number;
    fcm_token;
    stationss;
    manager_id;
    created_at;
    updated_at;
    is_active;
    avatar_url;
    status;
};
exports.Staff = Staff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Staff.prototype, "photo_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Staff.prototype, "empl_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Staff.prototype, "id_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Staff.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", raw_material_store_entity_1.RawMaterialStore)
], Staff.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Staff.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Staff.prototype, "cash_balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, department => department.staff),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Staff.prototype, "department_relation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "business_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "department_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, default: 'Contract' }),
    __metadata("design:type", String)
], Staff.prototype, "employment_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Male', 'Female', 'Other'],
        default: 'Male',
    }),
    __metadata("design:type", String)
], Staff.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "station_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station),
    (0, typeorm_1.JoinColumn)({ name: 'station_id' }),
    __metadata("design:type", station_entity_1.Station)
], Staff.prototype, "station", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Staff.prototype, "pump_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "fcm_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "stationss", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "manager_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Staff.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Staff.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Staff.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, default: 'https://via.placeholder.com/150' }),
    __metadata("design:type", String)
], Staff.prototype, "avatar_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Staff.prototype, "status", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)('staff')
], Staff);
//# sourceMappingURL=staff.entity.js.map
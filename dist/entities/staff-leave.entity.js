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
exports.StaffLeave = void 0;
const typeorm_1 = require("typeorm");
let StaffLeave = class StaffLeave {
    id;
    staff_id;
    leave_type_id;
    start_date;
    end_date;
    reason;
    attachment_url;
    status;
    is_half_day;
    approved_by;
    applied_at;
    updated_at;
};
exports.StaffLeave = StaffLeave;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffLeave.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], StaffLeave.prototype, "staff_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], StaffLeave.prototype, "leave_type_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], StaffLeave.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], StaffLeave.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StaffLeave.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], StaffLeave.prototype, "attachment_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' }),
    __metadata("design:type", String)
], StaffLeave.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Number)
], StaffLeave.prototype, "is_half_day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], StaffLeave.prototype, "approved_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], StaffLeave.prototype, "applied_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], StaffLeave.prototype, "updated_at", void 0);
exports.StaffLeave = StaffLeave = __decorate([
    (0, typeorm_1.Entity)('staff_leaves')
], StaffLeave);
//# sourceMappingURL=staff-leave.entity.js.map
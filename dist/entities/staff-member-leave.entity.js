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
exports.StaffMemberLeave = exports.STAFF_LEAVE_TYPES = void 0;
const typeorm_1 = require("typeorm");
const staff_member_entity_1 = require("./staff-member.entity");
exports.STAFF_LEAVE_TYPES = ['annual', 'sick', 'unpaid', 'compassionate', 'maternity_paternity', 'other'];
let StaffMemberLeave = class StaffMemberLeave {
    id;
    staffMemberId;
    staffMember;
    leaveType;
    startDate;
    endDate;
    reason;
    status;
    decisionNotes;
    createdAt;
};
exports.StaffMemberLeave = StaffMemberLeave;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffMemberLeave.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_member_id' }),
    __metadata("design:type", Number)
], StaffMemberLeave.prototype, "staffMemberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_member_entity_1.StaffMember),
    (0, typeorm_1.JoinColumn)({ name: 'staff_member_id' }),
    __metadata("design:type", staff_member_entity_1.StaffMember)
], StaffMemberLeave.prototype, "staffMember", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'leave_type', type: 'enum', enum: exports.STAFF_LEAVE_TYPES, default: 'annual' }),
    __metadata("design:type", String)
], StaffMemberLeave.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    __metadata("design:type", String)
], StaffMemberLeave.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date' }),
    __metadata("design:type", String)
], StaffMemberLeave.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], StaffMemberLeave.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'approved', 'declined'], default: 'pending' }),
    __metadata("design:type", String)
], StaffMemberLeave.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'decision_notes', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], StaffMemberLeave.prototype, "decisionNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StaffMemberLeave.prototype, "createdAt", void 0);
exports.StaffMemberLeave = StaffMemberLeave = __decorate([
    (0, typeorm_1.Entity)('staff_member_leaves')
], StaffMemberLeave);
//# sourceMappingURL=staff-member-leave.entity.js.map
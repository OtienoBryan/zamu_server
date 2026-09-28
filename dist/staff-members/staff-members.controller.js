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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffMembersController = void 0;
const common_1 = require("@nestjs/common");
const staff_members_service_1 = require("./staff-members.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_staff_member_dto_1 = require("./dto/create-staff-member.dto");
const update_staff_member_dto_1 = require("./dto/update-staff-member.dto");
let StaffMembersController = class StaffMembersController {
    staffMembersService;
    constructor(staffMembersService) {
        this.staffMembersService = staffMembersService;
    }
    async findAll() {
        return this.staffMembersService.findAll();
    }
    async findOne(id) {
        return this.staffMembersService.findOne(id);
    }
    async create(dto) {
        return this.staffMembersService.create(dto);
    }
    async update(id, dto) {
        return this.staffMembersService.update(id, dto);
    }
    async remove(id) {
        await this.staffMembersService.remove(id);
        return { message: 'Staff member deleted successfully' };
    }
};
exports.StaffMembersController = StaffMembersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffMembersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffMembersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_member_dto_1.CreateStaffMemberDto]),
    __metadata("design:returntype", Promise)
], StaffMembersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_staff_member_dto_1.UpdateStaffMemberDto]),
    __metadata("design:returntype", Promise)
], StaffMembersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffMembersController.prototype, "remove", null);
exports.StaffMembersController = StaffMembersController = __decorate([
    (0, common_1.Controller)('staff-members'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [staff_members_service_1.StaffMembersService])
], StaffMembersController);
//# sourceMappingURL=staff-members.controller.js.map
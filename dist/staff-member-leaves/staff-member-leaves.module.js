"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffMemberLeavesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_member_leaves_service_1 = require("./staff-member-leaves.service");
const staff_member_leaves_controller_1 = require("./staff-member-leaves.controller");
const staff_member_leave_entity_1 = require("../entities/staff-member-leave.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
let StaffMemberLeavesModule = class StaffMemberLeavesModule {
};
exports.StaffMemberLeavesModule = StaffMemberLeavesModule;
exports.StaffMemberLeavesModule = StaffMemberLeavesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([staff_member_leave_entity_1.StaffMemberLeave, staff_member_entity_1.StaffMember])],
        controllers: [staff_member_leaves_controller_1.StaffMemberLeavesController],
        providers: [staff_member_leaves_service_1.StaffMemberLeavesService],
        exports: [staff_member_leaves_service_1.StaffMemberLeavesService],
    })
], StaffMemberLeavesModule);
//# sourceMappingURL=staff-member-leaves.module.js.map
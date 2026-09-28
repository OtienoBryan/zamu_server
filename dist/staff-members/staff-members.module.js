"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffMembersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_members_service_1 = require("./staff-members.service");
const staff_members_controller_1 = require("./staff-members.controller");
const staff_member_entity_1 = require("../entities/staff-member.entity");
let StaffMembersModule = class StaffMembersModule {
};
exports.StaffMembersModule = StaffMembersModule;
exports.StaffMembersModule = StaffMembersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([staff_member_entity_1.StaffMember])],
        controllers: [staff_members_controller_1.StaffMembersController],
        providers: [staff_members_service_1.StaffMembersService],
        exports: [staff_members_service_1.StaffMembersService],
    })
], StaffMembersModule);
//# sourceMappingURL=staff-members.module.js.map
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
exports.MachinesController = void 0;
const common_1 = require("@nestjs/common");
const machines_service_1 = require("./machines.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_machine_dto_1 = require("./dto/create-machine.dto");
const update_machine_dto_1 = require("./dto/update-machine.dto");
let MachinesController = class MachinesController {
    machinesService;
    constructor(machinesService) {
        this.machinesService = machinesService;
    }
    async findAllCategories() {
        return this.machinesService.findAllCategories();
    }
    async createCategory(name) {
        return this.machinesService.createCategory(name);
    }
    async updateCategory(id, name) {
        return this.machinesService.updateCategory(id, name);
    }
    async removeCategory(id) {
        await this.machinesService.removeCategory(id);
        return { message: 'Category deleted successfully' };
    }
    async findAll() {
        return this.machinesService.findAll();
    }
    async findOne(id) {
        return this.machinesService.findOne(id);
    }
    async create(dto) {
        return this.machinesService.create(dto);
    }
    async update(id, dto) {
        return this.machinesService.update(id, dto);
    }
    async remove(id) {
        await this.machinesService.remove(id);
        return { message: 'Machine deleted successfully' };
    }
};
exports.MachinesController = MachinesController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('categories/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_machine_dto_1.CreateMachineDto]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_machine_dto_1.UpdateMachineDto]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "remove", null);
exports.MachinesController = MachinesController = __decorate([
    (0, common_1.Controller)('machines'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [machines_service_1.MachinesService])
], MachinesController);
//# sourceMappingURL=machines.controller.js.map
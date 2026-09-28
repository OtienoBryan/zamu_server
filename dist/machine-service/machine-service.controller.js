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
exports.MachineServiceController = void 0;
const common_1 = require("@nestjs/common");
const machine_service_service_1 = require("./machine-service.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_machine_service_dto_1 = require("./dto/create-machine-service.dto");
let MachineServiceController = class MachineServiceController {
    machineServiceService;
    constructor(machineServiceService) {
        this.machineServiceService = machineServiceService;
    }
    async findAll(machineId) {
        if (machineId != null && machineId !== '') {
            const id = Number(machineId);
            if (Number.isNaN(id)) {
                throw new common_1.BadRequestException('machineId must be a number');
            }
            return this.machineServiceService.findAll(id);
        }
        return this.machineServiceService.findAll();
    }
    async findOne(id) {
        return this.machineServiceService.findOne(id);
    }
    async create(dto, req) {
        return this.machineServiceService.create(dto, req.user.sub);
    }
};
exports.MachineServiceController = MachineServiceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('machineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachineServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MachineServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_machine_service_dto_1.CreateMachineServiceDto, Object]),
    __metadata("design:returntype", Promise)
], MachineServiceController.prototype, "create", null);
exports.MachineServiceController = MachineServiceController = __decorate([
    (0, common_1.Controller)('machine-service'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [machine_service_service_1.MachineServiceService])
], MachineServiceController);
//# sourceMappingURL=machine-service.controller.js.map
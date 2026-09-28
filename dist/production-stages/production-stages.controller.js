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
exports.ProductionStagesController = void 0;
const common_1 = require("@nestjs/common");
const production_stages_service_1 = require("./production-stages.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_production_stage_dto_1 = require("./dto/create-production-stage.dto");
const update_production_stage_dto_1 = require("./dto/update-production-stage.dto");
let ProductionStagesController = class ProductionStagesController {
    productionStagesService;
    constructor(productionStagesService) {
        this.productionStagesService = productionStagesService;
    }
    async findAll() {
        return this.productionStagesService.findAll();
    }
    async findOne(id) {
        return this.productionStagesService.findOne(id);
    }
    async create(dto) {
        return this.productionStagesService.create(dto);
    }
    async update(id, dto) {
        return this.productionStagesService.update(id, dto);
    }
    async remove(id) {
        await this.productionStagesService.remove(id);
        return { message: 'Production stage deleted successfully' };
    }
};
exports.ProductionStagesController = ProductionStagesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductionStagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductionStagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_production_stage_dto_1.CreateProductionStageDto]),
    __metadata("design:returntype", Promise)
], ProductionStagesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_production_stage_dto_1.UpdateProductionStageDto]),
    __metadata("design:returntype", Promise)
], ProductionStagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductionStagesController.prototype, "remove", null);
exports.ProductionStagesController = ProductionStagesController = __decorate([
    (0, common_1.Controller)('production-stages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [production_stages_service_1.ProductionStagesService])
], ProductionStagesController);
//# sourceMappingURL=production-stages.controller.js.map
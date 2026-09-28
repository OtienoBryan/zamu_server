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
exports.WorkOrderWasteController = void 0;
const common_1 = require("@nestjs/common");
const work_order_waste_service_1 = require("./work-order-waste.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_work_order_waste_dto_1 = require("./dto/create-work-order-waste.dto");
let WorkOrderWasteController = class WorkOrderWasteController {
    workOrderWasteService;
    constructor(workOrderWasteService) {
        this.workOrderWasteService = workOrderWasteService;
    }
    async findAll(workOrderId, type) {
        if (type != null && type !== '' && type !== 'offcut' && type !== 'damage') {
            throw new common_1.BadRequestException("type must be 'offcut' or 'damage'");
        }
        if (workOrderId != null && workOrderId !== '') {
            const id = Number(workOrderId);
            if (Number.isNaN(id)) {
                throw new common_1.BadRequestException('workOrderId must be a number');
            }
            return this.workOrderWasteService.findForWorkOrder(id);
        }
        return this.workOrderWasteService.findAll(type);
    }
    async create(dto) {
        return this.workOrderWasteService.create(dto);
    }
    async remove(id) {
        await this.workOrderWasteService.remove(id);
        return { message: 'Waste entry deleted successfully' };
    }
};
exports.WorkOrderWasteController = WorkOrderWasteController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('workOrderId')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkOrderWasteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_work_order_waste_dto_1.CreateWorkOrderWasteDto]),
    __metadata("design:returntype", Promise)
], WorkOrderWasteController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkOrderWasteController.prototype, "remove", null);
exports.WorkOrderWasteController = WorkOrderWasteController = __decorate([
    (0, common_1.Controller)('work-order-waste'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [work_order_waste_service_1.WorkOrderWasteService])
], WorkOrderWasteController);
//# sourceMappingURL=work-order-waste.controller.js.map
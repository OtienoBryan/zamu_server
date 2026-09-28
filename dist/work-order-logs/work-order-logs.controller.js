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
exports.WorkOrderLogsController = void 0;
const common_1 = require("@nestjs/common");
const work_order_logs_service_1 = require("./work-order-logs.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_work_order_log_dto_1 = require("./dto/create-work-order-log.dto");
let WorkOrderLogsController = class WorkOrderLogsController {
    workOrderLogsService;
    constructor(workOrderLogsService) {
        this.workOrderLogsService = workOrderLogsService;
    }
    async findAll(workOrderId, all) {
        if (workOrderId != null && workOrderId !== '') {
            const id = Number(workOrderId);
            if (Number.isNaN(id)) {
                throw new common_1.BadRequestException('workOrderId must be a number');
            }
            return this.workOrderLogsService.findForWorkOrder(id);
        }
        if (all === 'true') {
            return this.workOrderLogsService.findAllLogs();
        }
        return this.workOrderLogsService.findAllForCompletedWorkOrders();
    }
    async create(dto) {
        return this.workOrderLogsService.create(dto);
    }
    async remove(id) {
        await this.workOrderLogsService.remove(id);
        return { message: 'Work order log deleted successfully' };
    }
};
exports.WorkOrderLogsController = WorkOrderLogsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('workOrderId')),
    __param(1, (0, common_1.Query)('all')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkOrderLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_work_order_log_dto_1.CreateWorkOrderLogDto]),
    __metadata("design:returntype", Promise)
], WorkOrderLogsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkOrderLogsController.prototype, "remove", null);
exports.WorkOrderLogsController = WorkOrderLogsController = __decorate([
    (0, common_1.Controller)('work-order-logs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [work_order_logs_service_1.WorkOrderLogsService])
], WorkOrderLogsController);
//# sourceMappingURL=work-order-logs.controller.js.map
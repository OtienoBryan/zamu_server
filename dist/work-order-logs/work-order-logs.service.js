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
exports.WorkOrderLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const work_order_log_entity_1 = require("../entities/work-order-log.entity");
const work_order_entity_1 = require("../entities/work-order.entity");
let WorkOrderLogsService = class WorkOrderLogsService {
    workOrderLogRepository;
    workOrderRepository;
    constructor(workOrderLogRepository, workOrderRepository) {
        this.workOrderLogRepository = workOrderLogRepository;
        this.workOrderRepository = workOrderRepository;
    }
    async findForWorkOrder(workOrderId) {
        return this.workOrderLogRepository.find({
            where: { workOrderId },
            order: { startTime: 'DESC' },
        });
    }
    async findAllForCompletedWorkOrders() {
        return this.workOrderLogRepository
            .createQueryBuilder('log')
            .leftJoinAndSelect('log.workOrder', 'workOrder')
            .leftJoinAndSelect('workOrder.staff', 'staff')
            .where('workOrder.status = :status', { status: 'completed' })
            .orderBy('log.startTime', 'DESC')
            .getMany();
    }
    async findAllLogs() {
        return this.workOrderLogRepository
            .createQueryBuilder('log')
            .leftJoinAndSelect('log.workOrder', 'workOrder')
            .leftJoinAndSelect('workOrder.staff', 'staff')
            .leftJoinAndSelect('workOrder.product', 'product')
            .leftJoinAndSelect('workOrder.stage', 'stage')
            .orderBy('log.startTime', 'DESC')
            .getMany();
    }
    async create(dto) {
        const workOrder = await this.workOrderRepository.findOne({ where: { id: dto.workOrderId } });
        if (!workOrder) {
            throw new common_1.NotFoundException(`Work order with ID ${dto.workOrderId} not found`);
        }
        if (new Date(dto.endTime) <= new Date(dto.startTime)) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        const log = this.workOrderLogRepository.create({
            workOrderId: dto.workOrderId,
            startTime: new Date(dto.startTime),
            endTime: new Date(dto.endTime),
            quantityDone: dto.quantityDone,
        });
        return this.workOrderLogRepository.save(log);
    }
    async remove(id) {
        const log = await this.workOrderLogRepository.findOne({ where: { id } });
        if (!log) {
            throw new common_1.NotFoundException(`Work order log with ID ${id} not found`);
        }
        await this.workOrderLogRepository.remove(log);
    }
};
exports.WorkOrderLogsService = WorkOrderLogsService;
exports.WorkOrderLogsService = WorkOrderLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_order_log_entity_1.WorkOrderLog)),
    __param(1, (0, typeorm_1.InjectRepository)(work_order_entity_1.WorkOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WorkOrderLogsService);
//# sourceMappingURL=work-order-logs.service.js.map
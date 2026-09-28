"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderLogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const work_order_logs_service_1 = require("./work-order-logs.service");
const work_order_logs_controller_1 = require("./work-order-logs.controller");
const work_order_log_entity_1 = require("../entities/work-order-log.entity");
const work_order_entity_1 = require("../entities/work-order.entity");
let WorkOrderLogsModule = class WorkOrderLogsModule {
};
exports.WorkOrderLogsModule = WorkOrderLogsModule;
exports.WorkOrderLogsModule = WorkOrderLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([work_order_log_entity_1.WorkOrderLog, work_order_entity_1.WorkOrder])],
        controllers: [work_order_logs_controller_1.WorkOrderLogsController],
        providers: [work_order_logs_service_1.WorkOrderLogsService],
        exports: [work_order_logs_service_1.WorkOrderLogsService],
    })
], WorkOrderLogsModule);
//# sourceMappingURL=work-order-logs.module.js.map
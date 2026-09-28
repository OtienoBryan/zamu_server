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
exports.PaymentsController = exports.JobCardPaymentsController = void 0;
const common_1 = require("@nestjs/common");
const job_card_payments_service_1 = require("./job-card-payments.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_job_card_payment_dto_1 = require("./dto/create-job-card-payment.dto");
let JobCardPaymentsController = class JobCardPaymentsController {
    jobCardPaymentsService;
    constructor(jobCardPaymentsService) {
        this.jobCardPaymentsService = jobCardPaymentsService;
    }
    async findAll(jobCardId) {
        return this.jobCardPaymentsService.findAllForJobCard(jobCardId);
    }
    async create(jobCardId, dto, req) {
        return this.jobCardPaymentsService.create(jobCardId, dto, req.user?.sub ?? null);
    }
};
exports.JobCardPaymentsController = JobCardPaymentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('jobCardId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobCardPaymentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('jobCardId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_job_card_payment_dto_1.CreateJobCardPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], JobCardPaymentsController.prototype, "create", null);
exports.JobCardPaymentsController = JobCardPaymentsController = __decorate([
    (0, common_1.Controller)('job-cards/:jobCardId/payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [job_card_payments_service_1.JobCardPaymentsService])
], JobCardPaymentsController);
let PaymentsController = class PaymentsController {
    jobCardPaymentsService;
    constructor(jobCardPaymentsService) {
        this.jobCardPaymentsService = jobCardPaymentsService;
    }
    async findAll() {
        return this.jobCardPaymentsService.findAll();
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findAll", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [job_card_payments_service_1.JobCardPaymentsService])
], PaymentsController);
//# sourceMappingURL=job-card-payments.controller.js.map
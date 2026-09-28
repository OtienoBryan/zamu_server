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
exports.JobCardsController = void 0;
const common_1 = require("@nestjs/common");
const job_cards_service_1 = require("./job-cards.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_job_card_dto_1 = require("./dto/create-job-card.dto");
const update_job_card_dto_1 = require("./dto/update-job-card.dto");
const convert_to_invoice_dto_1 = require("./dto/convert-to-invoice.dto");
let JobCardsController = class JobCardsController {
    jobCardsService;
    constructor(jobCardsService) {
        this.jobCardsService = jobCardsService;
    }
    async findAll(conversionVehicleId, conversionClientId) {
        return this.jobCardsService.findAll(conversionVehicleId ? Number(conversionVehicleId) : undefined, conversionClientId ? Number(conversionClientId) : undefined);
    }
    async findOne(id) {
        return this.jobCardsService.findOne(id);
    }
    async create(createJobCardDto) {
        return this.jobCardsService.create(createJobCardDto);
    }
    async update(id, updateJobCardDto) {
        return this.jobCardsService.update(id, updateJobCardDto);
    }
    async convertToInvoice(id, dto) {
        return this.jobCardsService.convertToInvoice(id, dto);
    }
    async remove(id) {
        await this.jobCardsService.remove(id);
        return { message: 'Job card deleted successfully' };
    }
};
exports.JobCardsController = JobCardsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('conversionVehicleId')),
    __param(1, (0, common_1.Query)('conversionClientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobCardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_card_dto_1.CreateJobCardDto]),
    __metadata("design:returntype", Promise)
], JobCardsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_job_card_dto_1.UpdateJobCardDto]),
    __metadata("design:returntype", Promise)
], JobCardsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/convert-to-invoice'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, convert_to_invoice_dto_1.ConvertToInvoiceDto]),
    __metadata("design:returntype", Promise)
], JobCardsController.prototype, "convertToInvoice", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobCardsController.prototype, "remove", null);
exports.JobCardsController = JobCardsController = __decorate([
    (0, common_1.Controller)('job-cards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [job_cards_service_1.JobCardsService])
], JobCardsController);
//# sourceMappingURL=job-cards.controller.js.map
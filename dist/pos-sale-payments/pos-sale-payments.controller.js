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
exports.PosSalePaymentsController = void 0;
const common_1 = require("@nestjs/common");
const pos_sale_payments_service_1 = require("./pos-sale-payments.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_pos_sale_payment_dto_1 = require("./dto/create-pos-sale-payment.dto");
let PosSalePaymentsController = class PosSalePaymentsController {
    posSalePaymentsService;
    constructor(posSalePaymentsService) {
        this.posSalePaymentsService = posSalePaymentsService;
    }
    async findAll(posSaleId) {
        if (posSaleId != null && posSaleId !== '') {
            const id = Number(posSaleId);
            if (Number.isNaN(id)) {
                throw new common_1.BadRequestException('posSaleId must be a number');
            }
            return this.posSalePaymentsService.findForSale(id);
        }
        return this.posSalePaymentsService.findAll();
    }
    async create(dto, req) {
        return this.posSalePaymentsService.create(dto, req.user.sub);
    }
    async remove(id) {
        await this.posSalePaymentsService.remove(id);
        return { message: 'POS sale payment deleted successfully' };
    }
};
exports.PosSalePaymentsController = PosSalePaymentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('posSaleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PosSalePaymentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pos_sale_payment_dto_1.CreatePosSalePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PosSalePaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PosSalePaymentsController.prototype, "remove", null);
exports.PosSalePaymentsController = PosSalePaymentsController = __decorate([
    (0, common_1.Controller)('pos-sale-payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pos_sale_payments_service_1.PosSalePaymentsService])
], PosSalePaymentsController);
//# sourceMappingURL=pos-sale-payments.controller.js.map
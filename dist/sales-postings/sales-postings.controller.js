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
exports.SalesPostingsController = void 0;
const common_1 = require("@nestjs/common");
const sales_postings_service_1 = require("./sales-postings.service");
const create_sales_posting_dto_1 = require("./dto/create-sales-posting.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SalesPostingsController = class SalesPostingsController {
    salesPostingsService;
    constructor(salesPostingsService) {
        this.salesPostingsService = salesPostingsService;
    }
    async findAll(stationId) {
        return this.salesPostingsService.findAll({
            stationId: stationId ? parseInt(stationId, 10) : undefined,
        });
    }
    async create(dto, req) {
        const postedBy = req.user?.sub ?? null;
        return this.salesPostingsService.create(dto, postedBy);
    }
    async update(id, dto, req) {
        const postedBy = req.user?.sub ?? null;
        return this.salesPostingsService.update(parseInt(id, 10), dto, postedBy);
    }
};
exports.SalesPostingsController = SalesPostingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('stationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesPostingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sales_posting_dto_1.CreateSalesPostingDto, Object]),
    __metadata("design:returntype", Promise)
], SalesPostingsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_sales_posting_dto_1.CreateSalesPostingDto, Object]),
    __metadata("design:returntype", Promise)
], SalesPostingsController.prototype, "update", null);
exports.SalesPostingsController = SalesPostingsController = __decorate([
    (0, common_1.Controller)('sales-postings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [sales_postings_service_1.SalesPostingsService])
], SalesPostingsController);
//# sourceMappingURL=sales-postings.controller.js.map
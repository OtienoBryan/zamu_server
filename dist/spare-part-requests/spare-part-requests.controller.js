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
exports.SparePartRequestsController = void 0;
const common_1 = require("@nestjs/common");
const spare_part_requests_service_1 = require("./spare-part-requests.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_spare_part_request_dto_1 = require("./dto/create-spare-part-request.dto");
const fulfill_spare_part_request_dto_1 = require("./dto/fulfill-spare-part-request.dto");
let SparePartRequestsController = class SparePartRequestsController {
    requestsService;
    constructor(requestsService) {
        this.requestsService = requestsService;
    }
    async findAll() {
        return this.requestsService.findAll();
    }
    async findOne(id) {
        return this.requestsService.findOne(id);
    }
    async create(dto, req) {
        return this.requestsService.create(dto, req.user.sub);
    }
    async fulfill(id, dto, req) {
        return this.requestsService.fulfill(id, dto, req.user.sub);
    }
    async cancel(id) {
        return this.requestsService.cancel(id);
    }
};
exports.SparePartRequestsController = SparePartRequestsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SparePartRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SparePartRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_spare_part_request_dto_1.CreateSparePartRequestDto, Object]),
    __metadata("design:returntype", Promise)
], SparePartRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/fulfill'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, fulfill_spare_part_request_dto_1.FulfillSparePartRequestDto, Object]),
    __metadata("design:returntype", Promise)
], SparePartRequestsController.prototype, "fulfill", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SparePartRequestsController.prototype, "cancel", null);
exports.SparePartRequestsController = SparePartRequestsController = __decorate([
    (0, common_1.Controller)('spare-part-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [spare_part_requests_service_1.SparePartRequestsService])
], SparePartRequestsController);
//# sourceMappingURL=spare-part-requests.controller.js.map
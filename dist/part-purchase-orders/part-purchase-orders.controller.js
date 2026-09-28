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
exports.PartPurchaseOrdersController = void 0;
const common_1 = require("@nestjs/common");
const part_purchase_orders_service_1 = require("./part-purchase-orders.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PartPurchaseOrdersController = class PartPurchaseOrdersController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() { return this.service.findAll(); }
    nextPO() { return this.service.generatePoNumber().then(n => ({ po_number: n })); }
    findOne(id) { return this.service.findOne(id); }
    create(body) { return this.service.create(body); }
    updateStatus(id, b) { return this.service.updateStatus(id, b.status, b.store_id); }
    async remove(id) { await this.service.remove(id); return { message: 'Deleted' }; }
};
exports.PartPurchaseOrdersController = PartPurchaseOrdersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PartPurchaseOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('next-po'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PartPurchaseOrdersController.prototype, "nextPO", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PartPurchaseOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PartPurchaseOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PartPurchaseOrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PartPurchaseOrdersController.prototype, "remove", null);
exports.PartPurchaseOrdersController = PartPurchaseOrdersController = __decorate([
    (0, common_1.Controller)('part-purchase-orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [part_purchase_orders_service_1.PartPurchaseOrdersService])
], PartPurchaseOrdersController);
//# sourceMappingURL=part-purchase-orders.controller.js.map
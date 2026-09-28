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
exports.PurchaseOrdersController = void 0;
const common_1 = require("@nestjs/common");
const purchase_orders_service_1 = require("./purchase-orders.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_purchase_order_dto_1 = require("./dto/create-purchase-order.dto");
const receive_purchase_order_dto_1 = require("./dto/receive-purchase-order.dto");
const create_store_dto_1 = require("./dto/create-store.dto");
const update_store_dto_1 = require("./dto/update-store.dto");
let PurchaseOrdersController = class PurchaseOrdersController {
    purchaseOrdersService;
    constructor(purchaseOrdersService) {
        this.purchaseOrdersService = purchaseOrdersService;
    }
    async findAllStores() {
        return this.purchaseOrdersService.findAllStores();
    }
    async createStore(dto) {
        return this.purchaseOrdersService.createStore(dto);
    }
    async updateStore(id, dto) {
        return this.purchaseOrdersService.updateStore(id, dto);
    }
    async removeStore(id) {
        await this.purchaseOrdersService.removeStore(id);
        return { message: 'Store deleted successfully' };
    }
    async findAllInventory() {
        return this.purchaseOrdersService.findAllInventory();
    }
    async findStoreInventory(storeId) {
        return this.purchaseOrdersService.findStoreInventory(storeId);
    }
    async findInventoryLedger() {
        return this.purchaseOrdersService.findInventoryLedger();
    }
    async findAll() {
        return this.purchaseOrdersService.findAll();
    }
    async findOne(id) {
        return this.purchaseOrdersService.findOne(id);
    }
    async create(dto) {
        return this.purchaseOrdersService.create(dto);
    }
    async receive(id, dto, req) {
        return this.purchaseOrdersService.receive(id, dto, req.user.sub);
    }
    async cancel(id) {
        return this.purchaseOrdersService.cancel(id);
    }
};
exports.PurchaseOrdersController = PurchaseOrdersController;
__decorate([
    (0, common_1.Get)('stores'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "findAllStores", null);
__decorate([
    (0, common_1.Post)('stores'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "createStore", null);
__decorate([
    (0, common_1.Put)('stores/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "updateStore", null);
__decorate([
    (0, common_1.Delete)('stores/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "removeStore", null);
__decorate([
    (0, common_1.Get)('inventory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "findAllInventory", null);
__decorate([
    (0, common_1.Get)('stores/:storeId/inventory'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "findStoreInventory", null);
__decorate([
    (0, common_1.Get)('inventory-ledger'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "findInventoryLedger", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_order_dto_1.CreatePurchaseOrderDto]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/receive'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, receive_purchase_order_dto_1.ReceivePurchaseOrderDto, Object]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "receive", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "cancel", null);
exports.PurchaseOrdersController = PurchaseOrdersController = __decorate([
    (0, common_1.Controller)('purchase-orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [purchase_orders_service_1.PurchaseOrdersService])
], PurchaseOrdersController);
//# sourceMappingURL=purchase-orders.controller.js.map
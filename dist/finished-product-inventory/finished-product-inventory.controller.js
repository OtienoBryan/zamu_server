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
exports.FinishedProductInventoryController = void 0;
const common_1 = require("@nestjs/common");
const finished_product_inventory_service_1 = require("./finished-product-inventory.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_adjustment_dto_1 = require("./dto/create-adjustment.dto");
const set_quantity_dto_1 = require("./dto/set-quantity.dto");
const transfer_dto_1 = require("./dto/transfer.dto");
let FinishedProductInventoryController = class FinishedProductInventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async findAllInventory() {
        return this.inventoryService.findAllInventory();
    }
    async findLedger(productId) {
        if (productId != null && productId !== '') {
            const id = Number(productId);
            if (Number.isNaN(id)) {
                throw new common_1.BadRequestException('productId must be a number');
            }
            return this.inventoryService.findLedger(id);
        }
        return this.inventoryService.findLedger();
    }
    async createAdjustment(dto, req) {
        return this.inventoryService.createAdjustment(dto, req.user.sub);
    }
    async setQuantity(dto, req) {
        return this.inventoryService.setQuantity(dto, req.user.sub);
    }
    async transfer(dto, req) {
        return this.inventoryService.transfer(dto, req.user.sub);
    }
};
exports.FinishedProductInventoryController = FinishedProductInventoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinishedProductInventoryController.prototype, "findAllInventory", null);
__decorate([
    (0, common_1.Get)('ledger'),
    __param(0, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinishedProductInventoryController.prototype, "findLedger", null);
__decorate([
    (0, common_1.Post)('adjust'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_adjustment_dto_1.CreateAdjustmentDto, Object]),
    __metadata("design:returntype", Promise)
], FinishedProductInventoryController.prototype, "createAdjustment", null);
__decorate([
    (0, common_1.Post)('set-quantity'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_quantity_dto_1.SetQuantityDto, Object]),
    __metadata("design:returntype", Promise)
], FinishedProductInventoryController.prototype, "setQuantity", null);
__decorate([
    (0, common_1.Post)('transfer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_dto_1.TransferDto, Object]),
    __metadata("design:returntype", Promise)
], FinishedProductInventoryController.prototype, "transfer", null);
exports.FinishedProductInventoryController = FinishedProductInventoryController = __decorate([
    (0, common_1.Controller)('finished-product-inventory'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [finished_product_inventory_service_1.FinishedProductInventoryService])
], FinishedProductInventoryController);
//# sourceMappingURL=finished-product-inventory.controller.js.map
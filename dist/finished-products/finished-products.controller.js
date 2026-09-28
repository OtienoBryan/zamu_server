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
exports.FinishedProductsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const finished_products_service_1 = require("./finished-products.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_finished_product_dto_1 = require("./dto/create-finished-product.dto");
const update_finished_product_dto_1 = require("./dto/update-finished-product.dto");
const add_material_dto_1 = require("./dto/add-material.dto");
const update_material_quantity_dto_1 = require("./dto/update-material-quantity.dto");
let FinishedProductsController = class FinishedProductsController {
    finishedProductsService;
    constructor(finishedProductsService) {
        this.finishedProductsService = finishedProductsService;
    }
    async findAllCategories() {
        return this.finishedProductsService.findAllCategories();
    }
    async createCategory(name) {
        return this.finishedProductsService.createCategory(name);
    }
    async uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('No image file provided');
        }
        return this.finishedProductsService.uploadImage(file);
    }
    async findAll() {
        return this.finishedProductsService.findAll();
    }
    async findOne(id) {
        return this.finishedProductsService.findOne(id);
    }
    async create(dto) {
        return this.finishedProductsService.create(dto);
    }
    async update(id, dto) {
        return this.finishedProductsService.update(id, dto);
    }
    async remove(id) {
        await this.finishedProductsService.remove(id);
        return { message: 'Finished product deleted successfully' };
    }
    async findMaterials(id) {
        return this.finishedProductsService.findMaterials(id);
    }
    async addMaterial(id, dto) {
        return this.finishedProductsService.addMaterial(id, dto);
    }
    async updateMaterialQuantity(id, lineId, dto) {
        return this.finishedProductsService.updateMaterialQuantity(id, lineId, dto);
    }
    async removeMaterial(id, lineId) {
        return this.finishedProductsService.removeMaterial(id, lineId);
    }
};
exports.FinishedProductsController = FinishedProductsController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_finished_product_dto_1.CreateFinishedProductDto]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_finished_product_dto_1.UpdateFinishedProductDto]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/materials'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "findMaterials", null);
__decorate([
    (0, common_1.Post)(':id/materials'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_material_dto_1.AddMaterialDto]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "addMaterial", null);
__decorate([
    (0, common_1.Put)(':id/materials/:lineId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('lineId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_material_quantity_dto_1.UpdateMaterialQuantityDto]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "updateMaterialQuantity", null);
__decorate([
    (0, common_1.Delete)(':id/materials/:lineId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('lineId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FinishedProductsController.prototype, "removeMaterial", null);
exports.FinishedProductsController = FinishedProductsController = __decorate([
    (0, common_1.Controller)('finished-products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [finished_products_service_1.FinishedProductsService])
], FinishedProductsController);
//# sourceMappingURL=finished-products.controller.js.map
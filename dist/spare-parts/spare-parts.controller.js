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
exports.SparePartsController = void 0;
const common_1 = require("@nestjs/common");
const spare_parts_service_1 = require("./spare-parts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_spare_part_dto_1 = require("./dto/create-spare-part.dto");
const update_spare_part_dto_1 = require("./dto/update-spare-part.dto");
let SparePartsController = class SparePartsController {
    sparePartsService;
    constructor(sparePartsService) {
        this.sparePartsService = sparePartsService;
    }
    async findAllCategories() {
        return this.sparePartsService.findAllCategories();
    }
    async createCategory(name) {
        return this.sparePartsService.createCategory(name);
    }
    async updateCategory(id, name) {
        return this.sparePartsService.updateCategory(id, name);
    }
    async removeCategory(id) {
        await this.sparePartsService.removeCategory(id);
        return { message: 'Category deleted successfully' };
    }
    async findAll() {
        return this.sparePartsService.findAll();
    }
    async findOne(id) {
        return this.sparePartsService.findOne(id);
    }
    async create(dto) {
        return this.sparePartsService.create(dto);
    }
    async update(id, dto) {
        return this.sparePartsService.update(id, dto);
    }
    async remove(id) {
        await this.sparePartsService.remove(id);
        return { message: 'Spare part deleted successfully' };
    }
};
exports.SparePartsController = SparePartsController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('categories/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_spare_part_dto_1.CreateSparePartDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_spare_part_dto_1.UpdateSparePartDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "remove", null);
exports.SparePartsController = SparePartsController = __decorate([
    (0, common_1.Controller)('spare-parts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [spare_parts_service_1.SparePartsService])
], SparePartsController);
//# sourceMappingURL=spare-parts.controller.js.map
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
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const stores_service_1 = require("./stores.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_store_dto_1 = require("./dto/create-store.dto");
const update_store_dto_1 = require("./dto/update-store.dto");
let StoresController = class StoresController {
    storesService;
    constructor(storesService) {
        this.storesService = storesService;
    }
    async findAll() {
        console.log('🏪 [StoresController] GET /stores');
        return this.storesService.findAll();
    }
    async findOne(id) {
        console.log(`🏪 [StoresController] GET /stores/${id}`);
        return this.storesService.findOne(id);
    }
    async create(createStoreDto) {
        console.log('🏪 [StoresController] POST /stores');
        console.log('🏪 [StoresController] Create store data:', createStoreDto);
        return this.storesService.create(createStoreDto);
    }
    async update(id, updateStoreDto) {
        console.log(`🏪 [StoresController] PUT /stores/${id}`);
        console.log('🏪 [StoresController] Update store data:', updateStoreDto);
        return this.storesService.update(id, updateStoreDto);
    }
    async remove(id) {
        console.log(`🏪 [StoresController] DELETE /stores/${id}`);
        await this.storesService.remove(id);
        return { message: 'Store deleted successfully' };
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "remove", null);
exports.StoresController = StoresController = __decorate([
    (0, common_1.Controller)('stores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map
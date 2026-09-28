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
exports.ConversionVehiclesController = void 0;
const common_1 = require("@nestjs/common");
const conversion_vehicles_service_1 = require("./conversion-vehicles.service");
const vehicle_analysis_service_1 = require("./services/vehicle-analysis.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_conversion_vehicle_dto_1 = require("./dto/create-conversion-vehicle.dto");
const update_conversion_vehicle_dto_1 = require("./dto/update-conversion-vehicle.dto");
const analyze_vehicle_image_dto_1 = require("./dto/analyze-vehicle-image.dto");
let ConversionVehiclesController = class ConversionVehiclesController {
    conversionVehiclesService;
    vehicleAnalysisService;
    constructor(conversionVehiclesService, vehicleAnalysisService) {
        this.conversionVehiclesService = conversionVehiclesService;
        this.vehicleAnalysisService = vehicleAnalysisService;
    }
    async findAll(conversionClientId) {
        if (conversionClientId) {
            const clientId = parseInt(conversionClientId, 10);
            if (isNaN(clientId)) {
                throw new Error('conversionClientId must be a valid number');
            }
            return this.conversionVehiclesService.findByConversionClient(clientId);
        }
        return this.conversionVehiclesService.findAll();
    }
    async findOne(id) {
        return this.conversionVehiclesService.findOne(id);
    }
    async create(createConversionVehicleDto) {
        return this.conversionVehiclesService.create(createConversionVehicleDto);
    }
    async update(id, updateConversionVehicleDto) {
        return this.conversionVehiclesService.update(id, updateConversionVehicleDto);
    }
    async remove(id) {
        await this.conversionVehiclesService.remove(id);
        return { message: 'Conversion vehicle deleted successfully' };
    }
    async analyzeImage(analyzeDto) {
        return this.vehicleAnalysisService.analyzeVehicleImage(analyzeDto.imageUrl);
    }
};
exports.ConversionVehiclesController = ConversionVehiclesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('conversionClientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversionVehiclesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversionVehiclesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversion_vehicle_dto_1.CreateConversionVehicleDto]),
    __metadata("design:returntype", Promise)
], ConversionVehiclesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_conversion_vehicle_dto_1.UpdateConversionVehicleDto]),
    __metadata("design:returntype", Promise)
], ConversionVehiclesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversionVehiclesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('analyze-image'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analyze_vehicle_image_dto_1.AnalyzeVehicleImageDto]),
    __metadata("design:returntype", Promise)
], ConversionVehiclesController.prototype, "analyzeImage", null);
exports.ConversionVehiclesController = ConversionVehiclesController = __decorate([
    (0, common_1.Controller)('conversion-vehicles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [conversion_vehicles_service_1.ConversionVehiclesService,
        vehicle_analysis_service_1.VehicleAnalysisService])
], ConversionVehiclesController);
//# sourceMappingURL=conversion-vehicles.controller.js.map
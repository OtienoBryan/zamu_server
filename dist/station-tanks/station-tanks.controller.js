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
exports.StationTanksController = void 0;
const common_1 = require("@nestjs/common");
const station_tanks_service_1 = require("./station-tanks.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_station_tank_dto_1 = require("./dto/create-station-tank.dto");
const update_station_tank_dto_1 = require("./dto/update-station-tank.dto");
let StationTanksController = class StationTanksController {
    stationTanksService;
    constructor(stationTanksService) {
        this.stationTanksService = stationTanksService;
    }
    async findAll(stationId) {
        return this.stationTanksService.findAll(stationId ? Number(stationId) : undefined);
    }
    async findOne(id) {
        return this.stationTanksService.findOne(id);
    }
    async create(dto) {
        return this.stationTanksService.create(dto);
    }
    async update(id, dto) {
        return this.stationTanksService.update(id, dto);
    }
    async remove(id) {
        await this.stationTanksService.remove(id);
        return { message: 'Tank deleted successfully' };
    }
};
exports.StationTanksController = StationTanksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('stationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationTanksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationTanksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_station_tank_dto_1.CreateStationTankDto]),
    __metadata("design:returntype", Promise)
], StationTanksController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_station_tank_dto_1.UpdateStationTankDto]),
    __metadata("design:returntype", Promise)
], StationTanksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationTanksController.prototype, "remove", null);
exports.StationTanksController = StationTanksController = __decorate([
    (0, common_1.Controller)('station-tanks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [station_tanks_service_1.StationTanksService])
], StationTanksController);
//# sourceMappingURL=station-tanks.controller.js.map
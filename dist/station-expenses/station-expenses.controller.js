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
exports.StationExpensesController = void 0;
const common_1 = require("@nestjs/common");
const station_expenses_service_1 = require("./station-expenses.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_station_expense_dto_1 = require("./dto/create-station-expense.dto");
const update_station_expense_dto_1 = require("./dto/update-station-expense.dto");
let StationExpensesController = class StationExpensesController {
    stationExpensesService;
    constructor(stationExpensesService) {
        this.stationExpensesService = stationExpensesService;
    }
    async findAll(stationId) {
        return this.stationExpensesService.findAll(stationId ? Number(stationId) : undefined);
    }
    async findOne(id) {
        return this.stationExpensesService.findOne(id);
    }
    async create(dto, req) {
        return this.stationExpensesService.create(dto, req.user?.sub ?? null);
    }
    async update(id, dto) {
        return this.stationExpensesService.update(id, dto);
    }
    async remove(id) {
        await this.stationExpensesService.remove(id);
        return { message: 'Expense deleted successfully' };
    }
};
exports.StationExpensesController = StationExpensesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('stationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationExpensesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationExpensesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_station_expense_dto_1.CreateStationExpenseDto, Object]),
    __metadata("design:returntype", Promise)
], StationExpensesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_station_expense_dto_1.UpdateStationExpenseDto]),
    __metadata("design:returntype", Promise)
], StationExpensesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationExpensesController.prototype, "remove", null);
exports.StationExpensesController = StationExpensesController = __decorate([
    (0, common_1.Controller)('station-expenses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [station_expenses_service_1.StationExpensesService])
], StationExpensesController);
//# sourceMappingURL=station-expenses.controller.js.map
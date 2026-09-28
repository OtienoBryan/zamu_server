"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationExpensesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const station_expenses_service_1 = require("./station-expenses.service");
const station_expenses_controller_1 = require("./station-expenses.controller");
const station_expense_entity_1 = require("../entities/station-expense.entity");
let StationExpensesModule = class StationExpensesModule {
};
exports.StationExpensesModule = StationExpensesModule;
exports.StationExpensesModule = StationExpensesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([station_expense_entity_1.StationExpense])],
        controllers: [station_expenses_controller_1.StationExpensesController],
        providers: [station_expenses_service_1.StationExpensesService],
        exports: [station_expenses_service_1.StationExpensesService],
    })
], StationExpensesModule);
//# sourceMappingURL=station-expenses.module.js.map
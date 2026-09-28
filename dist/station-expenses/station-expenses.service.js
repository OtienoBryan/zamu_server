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
exports.StationExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const station_expense_entity_1 = require("../entities/station-expense.entity");
const RELATIONS = ['station', 'user'];
let StationExpensesService = class StationExpensesService {
    expenseRepository;
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async findAll(stationId) {
        return this.expenseRepository.find({
            where: stationId ? { station_id: stationId } : {},
            relations: RELATIONS,
            order: { expense_date: 'DESC', id: 'DESC' },
        });
    }
    async findOne(id) {
        const expense = await this.expenseRepository.findOne({ where: { id }, relations: RELATIONS });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }
    async create(dto, userId) {
        const expense = this.expenseRepository.create({
            station_id: dto.station_id,
            user_id: dto.user_id ?? userId ?? 0,
            amount: dto.amount,
            expense_date: dto.expense_date,
            comment: dto.comment ?? '',
            payment_method: dto.payment_method,
        });
        const saved = await this.expenseRepository.save(expense);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        const expense = await this.findOne(id);
        Object.assign(expense, dto);
        await this.expenseRepository.save(expense);
        return this.findOne(id);
    }
    async remove(id) {
        const expense = await this.findOne(id);
        await this.expenseRepository.remove(expense);
    }
};
exports.StationExpensesService = StationExpensesService;
exports.StationExpensesService = StationExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(station_expense_entity_1.StationExpense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StationExpensesService);
//# sourceMappingURL=station-expenses.service.js.map
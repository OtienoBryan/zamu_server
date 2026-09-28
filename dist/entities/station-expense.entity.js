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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationExpense = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
const staff_entity_1 = require("./staff.entity");
const decimal = {
    to: (value) => value,
    from: (value) => (value === null ? 0 : parseFloat(value)),
};
let StationExpense = class StationExpense {
    id;
    user_id;
    user;
    station_id;
    station;
    amount;
    expense_date;
    comment;
    payment_method;
    created_at;
};
exports.StationExpense = StationExpense;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], StationExpense.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], StationExpense.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], StationExpense.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'station_id', type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], StationExpense.prototype, "station_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station),
    (0, typeorm_1.JoinColumn)({ name: 'station_id' }),
    __metadata("design:type", station_entity_1.Station)
], StationExpense.prototype, "station", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, transformer: decimal }),
    __metadata("design:type", Number)
], StationExpense.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expense_date', type: 'date' }),
    __metadata("design:type", String)
], StationExpense.prototype, "expense_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StationExpense.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method', type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], StationExpense.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StationExpense.prototype, "created_at", void 0);
exports.StationExpense = StationExpense = __decorate([
    (0, typeorm_1.Entity)('station_expenses')
], StationExpense);
//# sourceMappingURL=station-expense.entity.js.map
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
exports.ClientRecord = void 0;
const typeorm_1 = require("typeorm");
let ClientRecord = class ClientRecord {
    id;
    name;
    contact;
    address;
    creditTermsDays;
    createdAt;
    updatedAt;
};
exports.ClientRecord = ClientRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClientRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], ClientRecord.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ClientRecord.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], ClientRecord.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_terms_days', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], ClientRecord.prototype, "creditTermsDays", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ClientRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ClientRecord.prototype, "updatedAt", void 0);
exports.ClientRecord = ClientRecord = __decorate([
    (0, typeorm_1.Entity)('clients')
], ClientRecord);
//# sourceMappingURL=client-record.entity.js.map
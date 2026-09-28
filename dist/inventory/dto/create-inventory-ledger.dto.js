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
exports.CreateInventoryLedgerDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const inventory_transaction_dto_1 = require("./inventory-transaction.dto");
class CreateInventoryLedgerDto {
    inventory_id;
    store_id;
    part_id;
    transactionType;
    quantity;
    previous_quantity;
    new_quantity;
    reference_number;
    notes;
    created_by;
}
exports.CreateInventoryLedgerDto = CreateInventoryLedgerDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInventoryLedgerDto.prototype, "inventory_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInventoryLedgerDto.prototype, "store_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInventoryLedgerDto.prototype, "part_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(inventory_transaction_dto_1.TransactionType),
    __metadata("design:type", String)
], CreateInventoryLedgerDto.prototype, "transactionType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInventoryLedgerDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInventoryLedgerDto.prototype, "previous_quantity", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInventoryLedgerDto.prototype, "new_quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventoryLedgerDto.prototype, "reference_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventoryLedgerDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateInventoryLedgerDto.prototype, "created_by", void 0);
//# sourceMappingURL=create-inventory-ledger.dto.js.map
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
exports.CreateSparePartRequestDto = exports.CreateSparePartRequestItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateSparePartRequestItemDto {
    sparePartId;
    quantity;
}
exports.CreateSparePartRequestItemDto = CreateSparePartRequestItemDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSparePartRequestItemDto.prototype, "sparePartId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSparePartRequestItemDto.prototype, "quantity", void 0);
class CreateSparePartRequestDto {
    storeId;
    machineId;
    staffMemberId;
    items;
    notes;
}
exports.CreateSparePartRequestDto = CreateSparePartRequestDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSparePartRequestDto.prototype, "storeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSparePartRequestDto.prototype, "machineId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSparePartRequestDto.prototype, "staffMemberId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSparePartRequestItemDto),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateSparePartRequestDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSparePartRequestDto.prototype, "notes", void 0);
//# sourceMappingURL=create-spare-part-request.dto.js.map
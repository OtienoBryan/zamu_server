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
exports.CreateWorkOrderDto = exports.WorkOrderMaterialDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class WorkOrderMaterialDto {
    rawMaterialId;
    quantity;
}
exports.WorkOrderMaterialDto = WorkOrderMaterialDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], WorkOrderMaterialDto.prototype, "rawMaterialId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], WorkOrderMaterialDto.prototype, "quantity", void 0);
class CreateWorkOrderDto {
    description;
    productId;
    stageId;
    staffIds;
    date;
    targetQuantity;
    status;
    materials;
}
exports.CreateWorkOrderDto = CreateWorkOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateWorkOrderDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateWorkOrderDto.prototype, "stageId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], CreateWorkOrderDto.prototype, "staffIds", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateWorkOrderDto.prototype, "targetQuantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['pending', 'in_progress', 'completed', 'cancelled']),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WorkOrderMaterialDto),
    __metadata("design:type", Array)
], CreateWorkOrderDto.prototype, "materials", void 0);
//# sourceMappingURL=create-work-order.dto.js.map
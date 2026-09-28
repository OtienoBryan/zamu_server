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
exports.SparePartRequestItem = void 0;
const typeorm_1 = require("typeorm");
const spare_part_request_entity_1 = require("./spare-part-request.entity");
const spare_part_entity_1 = require("./spare-part.entity");
let SparePartRequestItem = class SparePartRequestItem {
    id;
    requestId;
    request;
    sparePartId;
    sparePart;
    quantity;
};
exports.SparePartRequestItem = SparePartRequestItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SparePartRequestItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_id' }),
    __metadata("design:type", Number)
], SparePartRequestItem.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => spare_part_request_entity_1.SparePartRequest, (request) => request.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'request_id' }),
    __metadata("design:type", spare_part_request_entity_1.SparePartRequest)
], SparePartRequestItem.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'spare_part_id' }),
    __metadata("design:type", Number)
], SparePartRequestItem.prototype, "sparePartId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => spare_part_entity_1.SparePart),
    (0, typeorm_1.JoinColumn)({ name: 'spare_part_id' }),
    __metadata("design:type", spare_part_entity_1.SparePart)
], SparePartRequestItem.prototype, "sparePart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], SparePartRequestItem.prototype, "quantity", void 0);
exports.SparePartRequestItem = SparePartRequestItem = __decorate([
    (0, typeorm_1.Entity)('spare_part_request_items')
], SparePartRequestItem);
//# sourceMappingURL=spare-part-request-item.entity.js.map
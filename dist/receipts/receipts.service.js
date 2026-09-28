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
exports.ReceiptsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const receipt_entity_1 = require("../entities/receipt.entity");
const RELATIONS = ['sale', 'sale.items', 'sale.items.product', 'client', 'payment', 'payment.paymentAccount'];
let ReceiptsService = class ReceiptsService {
    receiptRepository;
    constructor(receiptRepository) {
        this.receiptRepository = receiptRepository;
    }
    async findAll() {
        return this.receiptRepository.find({ relations: RELATIONS, order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const receipt = await this.receiptRepository.findOne({ where: { id }, relations: RELATIONS });
        if (!receipt) {
            throw new common_1.NotFoundException(`Receipt with ID ${id} not found`);
        }
        return receipt;
    }
    async findByPayment(posSalePaymentId) {
        const receipt = await this.receiptRepository.findOne({ where: { posSalePaymentId }, relations: RELATIONS });
        if (!receipt) {
            throw new common_1.NotFoundException(`No receipt found for payment ID ${posSalePaymentId}`);
        }
        return receipt;
    }
};
exports.ReceiptsService = ReceiptsService;
exports.ReceiptsService = ReceiptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(receipt_entity_1.Receipt)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReceiptsService);
//# sourceMappingURL=receipts.service.js.map
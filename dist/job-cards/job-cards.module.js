"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCardsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_cards_service_1 = require("./job-cards.service");
const job_cards_controller_1 = require("./job-cards.controller");
const job_card_payments_service_1 = require("./job-card-payments.service");
const job_card_payments_controller_1 = require("./job-card-payments.controller");
const job_card_entity_1 = require("../entities/job-card.entity");
const job_card_item_entity_1 = require("../entities/job-card-item.entity");
const job_card_payment_entity_1 = require("../entities/job-card-payment.entity");
const inventory_module_1 = require("../inventory/inventory.module");
let JobCardsModule = class JobCardsModule {
};
exports.JobCardsModule = JobCardsModule;
exports.JobCardsModule = JobCardsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_card_entity_1.JobCard, job_card_item_entity_1.JobCardItem, job_card_payment_entity_1.JobCardPayment]), inventory_module_1.InventoryModule],
        controllers: [job_cards_controller_1.JobCardsController, job_card_payments_controller_1.JobCardPaymentsController, job_card_payments_controller_1.PaymentsController],
        providers: [job_cards_service_1.JobCardsService, job_card_payments_service_1.JobCardPaymentsService],
        exports: [job_cards_service_1.JobCardsService, job_card_payments_service_1.JobCardPaymentsService],
    })
], JobCardsModule);
//# sourceMappingURL=job-cards.module.js.map
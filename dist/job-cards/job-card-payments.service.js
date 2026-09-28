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
exports.JobCardPaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_card_payment_entity_1 = require("../entities/job-card-payment.entity");
const job_card_entity_1 = require("../entities/job-card.entity");
let JobCardPaymentsService = class JobCardPaymentsService {
    paymentRepository;
    jobCardRepository;
    constructor(paymentRepository, jobCardRepository) {
        this.paymentRepository = paymentRepository;
        this.jobCardRepository = jobCardRepository;
    }
    async findAllForJobCard(jobCardId) {
        return this.paymentRepository.find({
            where: { job_card_id: jobCardId },
            relations: ['postedBy'],
            order: { payment_date: 'DESC', id: 'DESC' },
        });
    }
    async findAll() {
        return this.paymentRepository.find({
            relations: ['postedBy', 'jobCard', 'jobCard.conversionClient', 'jobCard.conversionVehicle', 'jobCard.items'],
            order: { payment_date: 'DESC', id: 'DESC' },
        });
    }
    async create(jobCardId, dto, postedBy) {
        const jobCard = await this.jobCardRepository.findOne({ where: { id: jobCardId } });
        if (!jobCard) {
            throw new common_1.NotFoundException(`Job card with ID ${jobCardId} not found`);
        }
        const payment = this.paymentRepository.create({
            job_card_id: jobCardId,
            amount: dto.amount,
            payment_method: dto.payment_method,
            reference: dto.reference ?? null,
            payment_date: dto.payment_date,
            notes: dto.notes ?? null,
            posted_by: postedBy ?? null,
        });
        const saved = await this.paymentRepository.save(payment);
        jobCard.amount_paid = Number(jobCard.amount_paid) + Number(dto.amount);
        await this.jobCardRepository.save(jobCard);
        return saved;
    }
};
exports.JobCardPaymentsService = JobCardPaymentsService;
exports.JobCardPaymentsService = JobCardPaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_card_payment_entity_1.JobCardPayment)),
    __param(1, (0, typeorm_1.InjectRepository)(job_card_entity_1.JobCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JobCardPaymentsService);
//# sourceMappingURL=job-card-payments.service.js.map
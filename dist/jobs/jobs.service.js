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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("../entities/job.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
let JobsService = class JobsService {
    jobRepository;
    productRepository;
    constructor(jobRepository, productRepository) {
        this.jobRepository = jobRepository;
        this.productRepository = productRepository;
    }
    async findAll() {
        return this.jobRepository.find({ relations: ['product'], order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const job = await this.jobRepository.findOne({ where: { id }, relations: ['product'] });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }
    async create(dto) {
        await this.ensureProductExists(dto.productId);
        this.ensureDateOrder(dto.startDate, dto.expectedEndDate);
        const job = this.jobRepository.create({
            productId: dto.productId,
            quantity: dto.quantity,
            startDate: dto.startDate,
            expectedEndDate: dto.expectedEndDate,
            notes: dto.notes ?? null,
            status: dto.status ?? 'open',
        });
        const saved = await this.jobRepository.save(job);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        const job = await this.findOne(id);
        if (dto.productId != null) {
            await this.ensureProductExists(dto.productId);
        }
        this.ensureDateOrder(dto.startDate ?? job.startDate ?? undefined, dto.expectedEndDate ?? job.expectedEndDate ?? undefined);
        Object.assign(job, dto);
        await this.jobRepository.save(job);
        return this.findOne(id);
    }
    async remove(id) {
        const job = await this.findOne(id);
        await this.jobRepository.remove(job);
    }
    async ensureProductExists(productId) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Finished product with ID ${productId} not found`);
        }
    }
    ensureDateOrder(startDate, expectedEndDate) {
        if (!startDate || !expectedEndDate)
            return;
        if (new Date(expectedEndDate) < new Date(startDate)) {
            throw new common_1.BadRequestException('Expected end date must be on or after the start date');
        }
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(finished_product_entity_1.FinishedProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map
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
exports.ConversionClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversion_client_entity_1 = require("../entities/conversion-client.entity");
let ConversionClientsService = class ConversionClientsService {
    conversionClientRepository;
    constructor(conversionClientRepository) {
        this.conversionClientRepository = conversionClientRepository;
    }
    async findAll() {
        return this.conversionClientRepository.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const client = await this.conversionClientRepository.findOne({ where: { id } });
        if (!client) {
            throw new common_1.NotFoundException(`Conversion client with ID ${id} not found`);
        }
        return client;
    }
    async create(createConversionClientDto) {
        const client = this.conversionClientRepository.create({
            name: createConversionClientDto.name,
            first_name: createConversionClientDto.first_name || null,
            middle_name: createConversionClientDto.middle_name || null,
            surname: createConversionClientDto.surname || null,
            email: createConversionClientDto.email || null,
            contact: createConversionClientDto.contact,
            address: createConversionClientDto.address || null,
            description: createConversionClientDto.description || null,
            region: createConversionClientDto.region || null,
            category: createConversionClientDto.category || 'individual',
            organization_type: createConversionClientDto.organization_type || null,
            organization_name: createConversionClientDto.organization_name || null,
            tax_pin: createConversionClientDto.tax_pin || null,
            referral_source: createConversionClientDto.referral_source || null,
            referral_notes: createConversionClientDto.referral_notes || null,
            tax_exempt: createConversionClientDto.tax_exempt !== undefined ? createConversionClientDto.tax_exempt : 0,
            apply_discount: createConversionClientDto.apply_discount !== undefined ? createConversionClientDto.apply_discount : 0,
            discount_rate: createConversionClientDto.discount_rate?.toString() ?? null,
            labour_rate_override: createConversionClientDto.labour_rate_override !== undefined ? createConversionClientDto.labour_rate_override : 0,
            labour_rate: createConversionClientDto.labour_rate?.toString() ?? null,
            parts_markup_override: createConversionClientDto.parts_markup_override !== undefined ? createConversionClientDto.parts_markup_override : 0,
            parts_markup: createConversionClientDto.parts_markup?.toString() ?? null,
            payment_terms_override: createConversionClientDto.payment_terms_override !== undefined ? createConversionClientDto.payment_terms_override : 0,
            payment_terms: createConversionClientDto.payment_terms || null,
            is_active: createConversionClientDto.is_active !== undefined ? createConversionClientDto.is_active : 1,
            account_number: await this.generateUniqueAccountNumber(),
        });
        return this.conversionClientRepository.save(client);
    }
    async generateUniqueAccountNumber() {
        let sequence = (await this.conversionClientRepository.count()) + 1;
        let accountNumber = '';
        let isUnique = false;
        while (!isUnique) {
            accountNumber = `MT-${String(sequence).padStart(4, '0')}`;
            const existing = await this.conversionClientRepository.findOne({ where: { account_number: accountNumber } });
            isUnique = !existing;
            sequence++;
        }
        return accountNumber;
    }
    async update(id, updateConversionClientDto) {
        const client = await this.findOne(id);
        Object.assign(client, updateConversionClientDto);
        return this.conversionClientRepository.save(client);
    }
    async remove(id) {
        const client = await this.findOne(id);
        await this.conversionClientRepository.remove(client);
    }
};
exports.ConversionClientsService = ConversionClientsService;
exports.ConversionClientsService = ConversionClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversion_client_entity_1.ConversionClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConversionClientsService);
//# sourceMappingURL=conversion-clients.service.js.map
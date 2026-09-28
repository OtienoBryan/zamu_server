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
exports.ChartOfAccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const account_category_entity_1 = require("../entities/account-category.entity");
const PAYMENT_METHOD_ACCOUNT_TYPE = 9;
const EXPENSE_ACCOUNT_TYPE = 16;
let ChartOfAccountsService = class ChartOfAccountsService {
    chartOfAccountRepository;
    accountCategoryRepository;
    constructor(chartOfAccountRepository, accountCategoryRepository) {
        this.chartOfAccountRepository = chartOfAccountRepository;
        this.accountCategoryRepository = accountCategoryRepository;
    }
    toRow(account, categoryName) {
        return {
            id: account.id,
            accountName: account.accountName,
            accountCode: account.accountCode,
            parentAccountId: account.parentAccountId,
            category: categoryName,
            description: account.description,
            isActive: !!account.isActive,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
        };
    }
    async findAll() {
        const [accounts, categories] = await Promise.all([
            this.chartOfAccountRepository.find({ order: { accountCode: 'ASC' } }),
            this.accountCategoryRepository.find(),
        ]);
        const categoryById = new Map(categories.map(c => [c.id, c.name]));
        return accounts.map(a => this.toRow(a, categoryById.get(a.parentAccountId) ?? null));
    }
    async findCategories() {
        return this.accountCategoryRepository.find({ order: { id: 'ASC' } });
    }
    async findPaymentMethods() {
        const accounts = await this.chartOfAccountRepository.find({
            where: { accountType: PAYMENT_METHOD_ACCOUNT_TYPE, isActive: 1 },
            order: { accountName: 'ASC' },
        });
        return accounts.map(a => ({ id: a.id, accountCode: a.accountCode, accountName: a.accountName }));
    }
    async findExpenseAccounts() {
        const accounts = await this.chartOfAccountRepository.find({
            where: { accountType: EXPENSE_ACCOUNT_TYPE, isActive: 1 },
            order: { accountName: 'ASC' },
        });
        return accounts.map(a => ({ id: a.id, accountCode: a.accountCode, accountName: a.accountName }));
    }
    async create(dto) {
        const account = this.chartOfAccountRepository.create({
            accountName: dto.accountName,
            accountCode: dto.accountCode,
            parentAccountId: dto.parentAccountId,
            accountType: dto.parentAccountId,
            fare: 0,
            description: dto.description ?? null,
            isActive: dto.isActive === false ? 0 : 1,
        });
        const saved = await this.chartOfAccountRepository.save(account);
        const category = await this.accountCategoryRepository.findOne({ where: { id: saved.parentAccountId } });
        return this.toRow(saved, category?.name ?? null);
    }
    async update(id, dto) {
        const account = await this.chartOfAccountRepository.findOne({ where: { id } });
        if (!account) {
            throw new common_1.NotFoundException(`Chart of account with ID ${id} not found`);
        }
        if (dto.accountName !== undefined)
            account.accountName = dto.accountName;
        if (dto.accountCode !== undefined)
            account.accountCode = dto.accountCode;
        if (dto.parentAccountId !== undefined)
            account.parentAccountId = dto.parentAccountId;
        if (dto.description !== undefined)
            account.description = dto.description;
        if (dto.isActive !== undefined)
            account.isActive = dto.isActive ? 1 : 0;
        const saved = await this.chartOfAccountRepository.save(account);
        const category = await this.accountCategoryRepository.findOne({ where: { id: saved.parentAccountId } });
        return this.toRow(saved, category?.name ?? null);
    }
    async remove(id) {
        const account = await this.chartOfAccountRepository.findOne({ where: { id } });
        if (!account) {
            throw new common_1.NotFoundException(`Chart of account with ID ${id} not found`);
        }
        await this.chartOfAccountRepository.remove(account);
    }
};
exports.ChartOfAccountsService = ChartOfAccountsService;
exports.ChartOfAccountsService = ChartOfAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chart_of_account_entity_1.ChartOfAccount)),
    __param(1, (0, typeorm_1.InjectRepository)(account_category_entity_1.AccountCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChartOfAccountsService);
//# sourceMappingURL=chart-of-accounts.service.js.map
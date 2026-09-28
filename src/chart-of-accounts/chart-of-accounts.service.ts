import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { AccountCategory } from '../entities/account-category.entity';
import { CreateChartOfAccountDto } from './dto/create-chart-of-account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-account.dto';

export interface ChartOfAccountRow {
  id: number;
  accountName: string;
  accountCode: string;
  parentAccountId: number;
  category: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethodOption {
  id: number;
  accountCode: string;
  accountName: string;
}

const PAYMENT_METHOD_ACCOUNT_TYPE = 9;
const EXPENSE_ACCOUNT_TYPE = 16;

@Injectable()
export class ChartOfAccountsService {
  constructor(
    @InjectRepository(ChartOfAccount)
    private chartOfAccountRepository: Repository<ChartOfAccount>,
    @InjectRepository(AccountCategory)
    private accountCategoryRepository: Repository<AccountCategory>,
  ) {}

  private toRow(account: ChartOfAccount, categoryName: string | null): ChartOfAccountRow {
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

  async findAll(): Promise<ChartOfAccountRow[]> {
    const [accounts, categories] = await Promise.all([
      this.chartOfAccountRepository.find({ order: { accountCode: 'ASC' } }),
      this.accountCategoryRepository.find(),
    ]);
    const categoryById = new Map(categories.map(c => [c.id, c.name]));
    return accounts.map(a => this.toRow(a, categoryById.get(a.parentAccountId) ?? null));
  }

  async findCategories(): Promise<AccountCategory[]> {
    return this.accountCategoryRepository.find({ order: { id: 'ASC' } });
  }

  async findPaymentMethods(): Promise<PaymentMethodOption[]> {
    const accounts = await this.chartOfAccountRepository.find({
      where: { accountType: PAYMENT_METHOD_ACCOUNT_TYPE, isActive: 1 },
      order: { accountName: 'ASC' },
    });
    return accounts.map(a => ({ id: a.id, accountCode: a.accountCode, accountName: a.accountName }));
  }

  async findExpenseAccounts(): Promise<PaymentMethodOption[]> {
    const accounts = await this.chartOfAccountRepository.find({
      where: { accountType: EXPENSE_ACCOUNT_TYPE, isActive: 1 },
      order: { accountName: 'ASC' },
    });
    return accounts.map(a => ({ id: a.id, accountCode: a.accountCode, accountName: a.accountName }));
  }

  async create(dto: CreateChartOfAccountDto): Promise<ChartOfAccountRow> {
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

  async update(id: number, dto: UpdateChartOfAccountDto): Promise<ChartOfAccountRow> {
    const account = await this.chartOfAccountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Chart of account with ID ${id} not found`);
    }

    if (dto.accountName !== undefined) account.accountName = dto.accountName;
    if (dto.accountCode !== undefined) account.accountCode = dto.accountCode;
    if (dto.parentAccountId !== undefined) account.parentAccountId = dto.parentAccountId;
    if (dto.description !== undefined) account.description = dto.description;
    if (dto.isActive !== undefined) account.isActive = dto.isActive ? 1 : 0;

    const saved = await this.chartOfAccountRepository.save(account);
    const category = await this.accountCategoryRepository.findOne({ where: { id: saved.parentAccountId } });
    return this.toRow(saved, category?.name ?? null);
  }

  async remove(id: number): Promise<void> {
    const account = await this.chartOfAccountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Chart of account with ID ${id} not found`);
    }
    await this.chartOfAccountRepository.remove(account);
  }
}

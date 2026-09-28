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
export declare class ChartOfAccountsService {
    private chartOfAccountRepository;
    private accountCategoryRepository;
    constructor(chartOfAccountRepository: Repository<ChartOfAccount>, accountCategoryRepository: Repository<AccountCategory>);
    private toRow;
    findAll(): Promise<ChartOfAccountRow[]>;
    findCategories(): Promise<AccountCategory[]>;
    findPaymentMethods(): Promise<PaymentMethodOption[]>;
    findExpenseAccounts(): Promise<PaymentMethodOption[]>;
    create(dto: CreateChartOfAccountDto): Promise<ChartOfAccountRow>;
    update(id: number, dto: UpdateChartOfAccountDto): Promise<ChartOfAccountRow>;
    remove(id: number): Promise<void>;
}

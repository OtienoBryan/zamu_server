import { ChartOfAccountsService, ChartOfAccountRow, PaymentMethodOption } from './chart-of-accounts.service';
import { AccountCategory } from '../entities/account-category.entity';
import { CreateChartOfAccountDto } from './dto/create-chart-of-account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-account.dto';
export declare class ChartOfAccountsController {
    private readonly chartOfAccountsService;
    constructor(chartOfAccountsService: ChartOfAccountsService);
    findAll(): Promise<ChartOfAccountRow[]>;
    findCategories(): Promise<AccountCategory[]>;
    findPaymentMethods(): Promise<PaymentMethodOption[]>;
    findExpenseAccounts(): Promise<PaymentMethodOption[]>;
    create(dto: CreateChartOfAccountDto): Promise<ChartOfAccountRow>;
    update(id: number, dto: UpdateChartOfAccountDto): Promise<ChartOfAccountRow>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

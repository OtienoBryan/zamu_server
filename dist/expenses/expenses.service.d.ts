import { Repository, DataSource } from 'typeorm';
import { Expense } from '../entities/expense.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpensesService {
    private expenseRepository;
    private chartOfAccountRepository;
    private dataSource;
    constructor(expenseRepository: Repository<Expense>, chartOfAccountRepository: Repository<ChartOfAccount>, dataSource: DataSource);
    findAll(): Promise<Expense[]>;
    create(dto: CreateExpenseDto, createdBy: number): Promise<Expense>;
}

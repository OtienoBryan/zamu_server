import { Repository, DataSource } from 'typeorm';
import { ExpensePayment } from '../entities/expense-payment.entity';
import { Expense } from '../entities/expense.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { CreateExpensePaymentDto } from './dto/create-expense-payment.dto';
export declare class ExpensePaymentsService {
    private expensePaymentRepository;
    private expenseRepository;
    private chartOfAccountRepository;
    private dataSource;
    constructor(expensePaymentRepository: Repository<ExpensePayment>, expenseRepository: Repository<Expense>, chartOfAccountRepository: Repository<ChartOfAccount>, dataSource: DataSource);
    findAll(): Promise<ExpensePayment[]>;
    findForExpense(expenseId: number): Promise<ExpensePayment[]>;
    create(dto: CreateExpensePaymentDto, createdBy: number): Promise<ExpensePayment>;
    remove(id: number): Promise<void>;
}

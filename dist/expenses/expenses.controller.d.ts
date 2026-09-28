import { ExpensesService } from './expenses.service';
import { Expense } from '../entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    findAll(): Promise<Expense[]>;
    create(dto: CreateExpenseDto, req: any): Promise<Expense>;
}

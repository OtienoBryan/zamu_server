import { ExpensePaymentsService } from './expense-payments.service';
import { ExpensePayment } from '../entities/expense-payment.entity';
import { CreateExpensePaymentDto } from './dto/create-expense-payment.dto';
export declare class ExpensePaymentsController {
    private readonly expensePaymentsService;
    constructor(expensePaymentsService: ExpensePaymentsService);
    findAll(expenseId?: string): Promise<ExpensePayment[]>;
    create(dto: CreateExpensePaymentDto, req: any): Promise<ExpensePayment>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

import { Expense } from './expense.entity';
import { ChartOfAccount } from './chart-of-account.entity';
export declare class ExpensePayment {
    id: number;
    expenseId: number;
    expense: Expense;
    paymentAccountId: number;
    paymentAccount: ChartOfAccount;
    amount: number;
    paymentDate: string;
    notes: string | null;
    createdBy: number | null;
    createdAt: Date;
    updatedAt: Date;
}

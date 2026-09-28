import { ChartOfAccount } from './chart-of-account.entity';
export declare class Expense {
    id: number;
    expenseAccountId: number;
    expenseAccount: ChartOfAccount;
    date: string;
    amount: number;
    description: string;
    createdBy: number | null;
    createdAt: Date;
    updatedAt: Date;
}

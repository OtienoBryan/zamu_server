import { PosSale } from './pos-sale.entity';
import { ChartOfAccount } from './chart-of-account.entity';
export declare class PosSalePayment {
    id: number;
    posSaleId: number;
    posSale: PosSale;
    paymentAccountId: number;
    paymentAccount: ChartOfAccount;
    amount: number;
    paymentDate: string;
    notes: string | null;
    createdBy: number | null;
    createdAt: Date;
    updatedAt: Date;
}

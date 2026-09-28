import { PosSalePayment } from './pos-sale-payment.entity';
import { PosSale } from './pos-sale.entity';
import { ClientRecord } from './client-record.entity';
export declare class Receipt {
    id: number;
    receiptNumber: string;
    posSalePaymentId: number;
    payment: PosSalePayment;
    posSaleId: number;
    sale: PosSale;
    clientId: number | null;
    client: ClientRecord | null;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    notes: string | null;
    createdBy: number | null;
    createdAt: Date;
}

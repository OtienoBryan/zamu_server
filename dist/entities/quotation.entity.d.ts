import { QuotationItem } from './quotation-item.entity';
import { ClientRecord } from './client-record.entity';
import { Staff } from './staff.entity';
import { PosSale } from './pos-sale.entity';
export declare class Quotation {
    id: number;
    clientId: number | null;
    client: ClientRecord | null;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    validUntil: string | null;
    notes: string | null;
    convertedSaleId: number | null;
    convertedSale: PosSale | null;
    createdBy: number | null;
    createdByStaff: Staff | null;
    createdAt: Date;
    updatedAt: Date;
    items: QuotationItem[];
}

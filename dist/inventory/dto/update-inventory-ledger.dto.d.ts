import { CreateInventoryLedgerDto } from './create-inventory-ledger.dto';
import { TransactionType } from './inventory-transaction.dto';
declare const UpdateInventoryLedgerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateInventoryLedgerDto>>;
export declare class UpdateInventoryLedgerDto extends UpdateInventoryLedgerDto_base {
    transactionType?: TransactionType;
}
export {};

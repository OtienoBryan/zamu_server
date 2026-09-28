import { RawMaterialStore } from './raw-material-store.entity';
import { Machine } from './machine.entity';
export type MachineLedgerTransactionType = 'adjustment_in' | 'adjustment_out' | 'transfer_in' | 'transfer_out';
export declare class MachineInventoryLedger {
    id: number;
    storeId: number;
    store: RawMaterialStore;
    machineId: number;
    machine: Machine;
    transactionType: MachineLedgerTransactionType;
    quantity: number;
    previousQuantity: number;
    newQuantity: number;
    notes: string | null;
    createdBy: number | null;
    createdAt: Date;
}

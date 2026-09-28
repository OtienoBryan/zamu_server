import { Repository, DataSource } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { SupplierLedger } from '../entities/supplier-ledger.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';
export interface SupplierAgingRow {
    supplierId: number;
    supplierName: string;
    current: number;
    days31to60: number;
    days61to90: number;
    over90: number;
    totalOutstanding: number;
}
export declare class SuppliersService {
    private supplierRepository;
    private supplierLedgerRepository;
    private dataSource;
    constructor(supplierRepository: Repository<Supplier>, supplierLedgerRepository: Repository<SupplierLedger>, dataSource: DataSource);
    findAll(): Promise<Supplier[]>;
    findOne(id: number): Promise<Supplier>;
    create(dto: CreateSupplierDto): Promise<Supplier>;
    update(id: number, dto: UpdateSupplierDto): Promise<Supplier>;
    remove(id: number): Promise<void>;
    findLedger(id: number): Promise<SupplierLedger[]>;
    getAgingReport(): Promise<SupplierAgingRow[]>;
    createPayment(supplierId: number, dto: CreateSupplierPaymentDto, createdBy: number): Promise<SupplierLedger>;
}

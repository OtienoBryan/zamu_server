import { SuppliersService, SupplierAgingRow } from './suppliers.service';
import { Supplier } from '../entities/supplier.entity';
import { SupplierLedger } from '../entities/supplier-ledger.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    findAll(): Promise<Supplier[]>;
    getAgingReport(): Promise<SupplierAgingRow[]>;
    findOne(id: number): Promise<Supplier>;
    findLedger(id: number): Promise<SupplierLedger[]>;
    createPayment(id: number, dto: CreateSupplierPaymentDto, req: any): Promise<SupplierLedger>;
    create(dto: CreateSupplierDto): Promise<Supplier>;
    update(id: number, dto: UpdateSupplierDto): Promise<Supplier>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

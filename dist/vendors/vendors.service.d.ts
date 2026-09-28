import { Repository } from 'typeorm';
import { Vendor } from '../entities/vendor.entity';
import { VendorLedger } from '../entities/vendor-ledger.entity';
export declare class VendorsService {
    private repo;
    private ledgerRepo;
    constructor(repo: Repository<Vendor>, ledgerRepo: Repository<VendorLedger>);
    findAll(): Promise<Vendor[]>;
    findOne(id: number): Promise<Vendor>;
    create(data: Partial<Vendor>): Promise<Vendor>;
    update(id: number, data: Partial<Vendor>): Promise<Vendor>;
    remove(id: number): Promise<void>;
    getLedger(vendorId: number): Promise<VendorLedger[]>;
}

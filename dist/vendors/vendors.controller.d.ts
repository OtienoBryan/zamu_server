import { VendorsService } from './vendors.service';
import { Vendor } from '../entities/vendor.entity';
export declare class VendorsController {
    private readonly service;
    constructor(service: VendorsService);
    findAll(): Promise<Vendor[]>;
    findOne(id: number): Promise<Vendor>;
    create(body: Partial<Vendor>): Promise<Vendor>;
    update(id: number, body: Partial<Vendor>): Promise<Vendor>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getLedger(id: number): Promise<import("../entities/vendor-ledger.entity").VendorLedger[]>;
}

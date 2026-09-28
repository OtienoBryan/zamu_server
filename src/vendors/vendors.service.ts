import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../entities/vendor.entity';
import { VendorLedger } from '../entities/vendor-ledger.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor) private repo: Repository<Vendor>,
    @InjectRepository(VendorLedger) private ledgerRepo: Repository<VendorLedger>,
  ) {}

  findAll(): Promise<Vendor[]> {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<Vendor> {
    const v = await this.repo.findOne({ where: { id } });
    if (!v) throw new NotFoundException(`Vendor ${id} not found`);
    return v;
  }

  create(data: Partial<Vendor>): Promise<Vendor> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Vendor>): Promise<Vendor> {
    const v = await this.findOne(id);
    Object.assign(v, data);
    return this.repo.save(v);
  }

  async remove(id: number): Promise<void> {
    const v = await this.findOne(id);
    await this.repo.remove(v);
  }

  getLedger(vendorId: number): Promise<VendorLedger[]> {
    return this.ledgerRepo.find({
      where: { vendor_id: vendorId },
      order: { created_at: 'DESC' },
    });
  }
}

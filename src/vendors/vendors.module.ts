import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { Vendor } from '../entities/vendor.entity';
import { VendorLedger } from '../entities/vendor-ledger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, VendorLedger])],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService],
})
export class VendorsModule {}

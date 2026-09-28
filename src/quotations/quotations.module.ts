import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationsService } from './quotations.service';
import { QuotationsController } from './quotations.controller';
import { Quotation } from '../entities/quotation.entity';
import { QuotationItem } from '../entities/quotation-item.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { ClientRecord } from '../entities/client-record.entity';
import { Staff } from '../entities/staff.entity';
import { PosSalesModule } from '../pos-sales/pos-sales.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quotation, QuotationItem, FinishedProduct, ClientRecord, Staff]),
    PosSalesModule,
  ],
  controllers: [QuotationsController],
  providers: [QuotationsService],
  exports: [QuotationsService],
})
export class QuotationsModule {}

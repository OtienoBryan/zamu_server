import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCardsService } from './job-cards.service';
import { JobCardsController } from './job-cards.controller';
import { JobCardPaymentsService } from './job-card-payments.service';
import { JobCardPaymentsController, PaymentsController } from './job-card-payments.controller';
import { JobCard } from '../entities/job-card.entity';
import { JobCardItem } from '../entities/job-card-item.entity';
import { JobCardPayment } from '../entities/job-card-payment.entity';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobCard, JobCardItem, JobCardPayment]), InventoryModule],
  controllers: [JobCardsController, JobCardPaymentsController, PaymentsController],
  providers: [JobCardsService, JobCardPaymentsService],
  exports: [JobCardsService, JobCardPaymentsService],
})
export class JobCardsModule {}

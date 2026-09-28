import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesPostingsService } from './sales-postings.service';
import { SalesPostingsController } from './sales-postings.controller';
import { SalesPosting } from '../entities/sales-posting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesPosting])],
  controllers: [SalesPostingsController],
  providers: [SalesPostingsService],
  exports: [SalesPostingsService],
})
export class SalesPostingsModule {}

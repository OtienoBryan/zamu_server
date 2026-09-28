import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { Receipt } from '../entities/receipt.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('receipts')
@UseGuards(JwtAuthGuard)
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Get()
  async findAll(): Promise<Receipt[]> {
    return this.receiptsService.findAll();
  }

  @Get('by-payment/:paymentId')
  async findByPayment(@Param('paymentId', ParseIntPipe) paymentId: number): Promise<Receipt> {
    return this.receiptsService.findByPayment(paymentId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Receipt> {
    return this.receiptsService.findOne(id);
  }
}

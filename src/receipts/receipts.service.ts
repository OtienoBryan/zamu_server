import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from '../entities/receipt.entity';

const RELATIONS = ['sale', 'sale.items', 'sale.items.product', 'client', 'payment', 'payment.paymentAccount'];

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
  ) {}

  async findAll(): Promise<Receipt[]> {
    return this.receiptRepository.find({ relations: RELATIONS, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Receipt> {
    const receipt = await this.receiptRepository.findOne({ where: { id }, relations: RELATIONS });
    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }
    return receipt;
  }

  async findByPayment(posSalePaymentId: number): Promise<Receipt> {
    const receipt = await this.receiptRepository.findOne({ where: { posSalePaymentId }, relations: RELATIONS });
    if (!receipt) {
      throw new NotFoundException(`No receipt found for payment ID ${posSalePaymentId}`);
    }
    return receipt;
  }
}

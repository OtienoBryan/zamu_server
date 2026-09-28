import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobCardPayment } from '../entities/job-card-payment.entity';
import { JobCard } from '../entities/job-card.entity';
import { CreateJobCardPaymentDto } from './dto/create-job-card-payment.dto';

@Injectable()
export class JobCardPaymentsService {
  constructor(
    @InjectRepository(JobCardPayment)
    private paymentRepository: Repository<JobCardPayment>,
    @InjectRepository(JobCard)
    private jobCardRepository: Repository<JobCard>,
  ) {}

  async findAllForJobCard(jobCardId: number): Promise<JobCardPayment[]> {
    return this.paymentRepository.find({
      where: { job_card_id: jobCardId },
      relations: ['postedBy'],
      order: { payment_date: 'DESC', id: 'DESC' },
    });
  }

  /** Every payment across all job cards, for the payments register. */
  async findAll(): Promise<JobCardPayment[]> {
    return this.paymentRepository.find({
      // items come along so the receipt can show the invoice total and balance
      relations: ['postedBy', 'jobCard', 'jobCard.conversionClient', 'jobCard.conversionVehicle', 'jobCard.items'],
      order: { payment_date: 'DESC', id: 'DESC' },
    });
  }

  async create(jobCardId: number, dto: CreateJobCardPaymentDto, postedBy?: number | null): Promise<JobCardPayment> {
    const jobCard = await this.jobCardRepository.findOne({ where: { id: jobCardId } });
    if (!jobCard) {
      throw new NotFoundException(`Job card with ID ${jobCardId} not found`);
    }

    const payment = this.paymentRepository.create({
      job_card_id: jobCardId,
      amount: dto.amount,
      payment_method: dto.payment_method,
      reference: dto.reference ?? null,
      payment_date: dto.payment_date,
      notes: dto.notes ?? null,
      posted_by: postedBy ?? null,
    });
    const saved = await this.paymentRepository.save(payment);

    jobCard.amount_paid = Number(jobCard.amount_paid) + Number(dto.amount);
    await this.jobCardRepository.save(jobCard);

    return saved;
  }
}

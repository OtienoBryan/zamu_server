import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { CreateWorkOrderLogDto } from './dto/create-work-order-log.dto';

@Injectable()
export class WorkOrderLogsService {
  constructor(
    @InjectRepository(WorkOrderLog)
    private workOrderLogRepository: Repository<WorkOrderLog>,
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
  ) {}

  async findForWorkOrder(workOrderId: number): Promise<WorkOrderLog[]> {
    return this.workOrderLogRepository.find({
      where: { workOrderId },
      order: { startTime: 'DESC' },
    });
  }

  async findAllForCompletedWorkOrders(): Promise<WorkOrderLog[]> {
    return this.workOrderLogRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.workOrder', 'workOrder')
      .leftJoinAndSelect('workOrder.staff', 'staff')
      .where('workOrder.status = :status', { status: 'completed' })
      .orderBy('log.startTime', 'DESC')
      .getMany();
  }

  // Every logged entry regardless of the parent work order's status — used by
  // the daily production report, which tracks actual output as it's logged
  // rather than waiting for an order to be marked complete via Confirm Work.
  async findAllLogs(): Promise<WorkOrderLog[]> {
    return this.workOrderLogRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.workOrder', 'workOrder')
      .leftJoinAndSelect('workOrder.staff', 'staff')
      .leftJoinAndSelect('workOrder.product', 'product')
      .leftJoinAndSelect('workOrder.stage', 'stage')
      .orderBy('log.startTime', 'DESC')
      .getMany();
  }

  async create(dto: CreateWorkOrderLogDto): Promise<WorkOrderLog> {
    const workOrder = await this.workOrderRepository.findOne({ where: { id: dto.workOrderId } });
    if (!workOrder) {
      throw new NotFoundException(`Work order with ID ${dto.workOrderId} not found`);
    }
    if (new Date(dto.endTime) <= new Date(dto.startTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    const log = this.workOrderLogRepository.create({
      workOrderId: dto.workOrderId,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      quantityDone: dto.quantityDone,
    });
    return this.workOrderLogRepository.save(log);
  }

  async remove(id: number): Promise<void> {
    const log = await this.workOrderLogRepository.findOne({ where: { id } });
    if (!log) {
      throw new NotFoundException(`Work order log with ID ${id} not found`);
    }
    await this.workOrderLogRepository.remove(log);
  }
}

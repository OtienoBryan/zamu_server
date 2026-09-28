import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { WorkOrderLogsService } from './work-order-logs.service';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWorkOrderLogDto } from './dto/create-work-order-log.dto';

@Controller('work-order-logs')
@UseGuards(JwtAuthGuard)
export class WorkOrderLogsController {
  constructor(private readonly workOrderLogsService: WorkOrderLogsService) {}

  @Get()
  async findAll(
    @Query('workOrderId') workOrderId?: string,
    @Query('all') all?: string,
  ): Promise<WorkOrderLog[]> {
    if (workOrderId != null && workOrderId !== '') {
      const id = Number(workOrderId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('workOrderId must be a number');
      }
      return this.workOrderLogsService.findForWorkOrder(id);
    }
    if (all === 'true') {
      return this.workOrderLogsService.findAllLogs();
    }
    return this.workOrderLogsService.findAllForCompletedWorkOrders();
  }

  @Post()
  async create(@Body() dto: CreateWorkOrderLogDto): Promise<WorkOrderLog> {
    return this.workOrderLogsService.create(dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.workOrderLogsService.remove(id);
    return { message: 'Work order log deleted successfully' };
  }
}

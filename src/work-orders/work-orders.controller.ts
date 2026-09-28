import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { WorkOrdersService } from './work-orders.service';
import { WorkOrder } from '../entities/work-order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWorkOrderDto } from './dto/create-work-order.dto';
import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { ConfirmWorkOrderDto } from './dto/confirm-work-order.dto';

@Controller('work-orders')
@UseGuards(JwtAuthGuard)
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Get()
  async findAll(): Promise<WorkOrder[]> {
    return this.workOrdersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WorkOrder> {
    return this.workOrdersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateWorkOrderDto): Promise<WorkOrder> {
    return this.workOrdersService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWorkOrderDto,
  ): Promise<WorkOrder> {
    return this.workOrdersService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.workOrdersService.remove(id);
    return { message: 'Work order deleted successfully' };
  }

  @Put(':id/confirm')
  async confirm(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConfirmWorkOrderDto,
  ): Promise<WorkOrder> {
    return this.workOrdersService.confirmComplete(id, dto);
  }
}

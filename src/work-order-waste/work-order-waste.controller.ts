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
import { WorkOrderWasteService } from './work-order-waste.service';
import { WorkOrderWasteEntry } from '../entities/work-order-waste.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWorkOrderWasteDto } from './dto/create-work-order-waste.dto';

@Controller('work-order-waste')
@UseGuards(JwtAuthGuard)
export class WorkOrderWasteController {
  constructor(private readonly workOrderWasteService: WorkOrderWasteService) {}

  @Get()
  async findAll(
    @Query('workOrderId') workOrderId?: string,
    @Query('type') type?: string,
  ): Promise<WorkOrderWasteEntry[]> {
    if (type != null && type !== '' && type !== 'offcut' && type !== 'damage') {
      throw new BadRequestException("type must be 'offcut' or 'damage'");
    }
    if (workOrderId != null && workOrderId !== '') {
      const id = Number(workOrderId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('workOrderId must be a number');
      }
      return this.workOrderWasteService.findForWorkOrder(id);
    }
    return this.workOrderWasteService.findAll(type as 'offcut' | 'damage' | undefined);
  }

  @Post()
  async create(@Body() dto: CreateWorkOrderWasteDto): Promise<WorkOrderWasteEntry> {
    return this.workOrderWasteService.create(dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.workOrderWasteService.remove(id);
    return { message: 'Waste entry deleted successfully' };
  }
}

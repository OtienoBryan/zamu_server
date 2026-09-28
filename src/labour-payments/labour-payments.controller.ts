import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LabourPaymentsService } from './labour-payments.service';
import { LabourPayment } from '../entities/labour-payment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLabourPaymentDto } from './dto/create-labour-payment.dto';

@Controller('labour-payments')
@UseGuards(JwtAuthGuard)
export class LabourPaymentsController {
  constructor(private readonly labourPaymentsService: LabourPaymentsService) {}

  @Get()
  async findAll(): Promise<LabourPayment[]> {
    return this.labourPaymentsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateLabourPaymentDto, @Request() req): Promise<LabourPayment> {
    return this.labourPaymentsService.create(dto, req.user.sub);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.labourPaymentsService.remove(id);
    return { message: 'Labour payment deleted successfully' };
  }
}

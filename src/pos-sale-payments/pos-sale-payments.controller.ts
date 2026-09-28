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
  Request,
  BadRequestException,
} from '@nestjs/common';
import { PosSalePaymentsService } from './pos-sale-payments.service';
import { PosSalePayment } from '../entities/pos-sale-payment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePosSalePaymentDto } from './dto/create-pos-sale-payment.dto';

@Controller('pos-sale-payments')
@UseGuards(JwtAuthGuard)
export class PosSalePaymentsController {
  constructor(private readonly posSalePaymentsService: PosSalePaymentsService) {}

  @Get()
  async findAll(@Query('posSaleId') posSaleId?: string): Promise<PosSalePayment[]> {
    if (posSaleId != null && posSaleId !== '') {
      const id = Number(posSaleId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('posSaleId must be a number');
      }
      return this.posSalePaymentsService.findForSale(id);
    }
    return this.posSalePaymentsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreatePosSalePaymentDto, @Request() req): Promise<PosSalePayment> {
    return this.posSalePaymentsService.create(dto, req.user.sub);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.posSalePaymentsService.remove(id);
    return { message: 'POS sale payment deleted successfully' };
  }
}

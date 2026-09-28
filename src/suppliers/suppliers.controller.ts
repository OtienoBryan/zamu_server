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
  Request,
} from '@nestjs/common';
import { SuppliersService, SupplierAgingRow } from './suppliers.service';
import { Supplier } from '../entities/supplier.entity';
import { SupplierLedger } from '../entities/supplier-ledger.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';

@Controller('suppliers')
@UseGuards(JwtAuthGuard)
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  async findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get('payables/aging')
  async getAgingReport(): Promise<SupplierAgingRow[]> {
    return this.suppliersService.getAgingReport();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  @Get(':id/ledger')
  async findLedger(@Param('id', ParseIntPipe) id: number): Promise<SupplierLedger[]> {
    return this.suppliersService.findLedger(id);
  }

  @Post(':id/payment')
  async createPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateSupplierPaymentDto,
    @Request() req,
  ): Promise<SupplierLedger> {
    return this.suppliersService.createPayment(id, dto, req.user.sub);
  }

  @Post()
  async create(@Body() dto: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.suppliersService.remove(id);
    return { message: 'Supplier deleted successfully' };
  }
}

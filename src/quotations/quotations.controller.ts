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
import { QuotationsService } from './quotations.service';
import { Quotation } from '../entities/quotation.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ConvertQuotationDto } from './dto/convert-quotation.dto';

@Controller('quotations')
@UseGuards(JwtAuthGuard)
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Get()
  async findAll(): Promise<Quotation[]> {
    return this.quotationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Quotation> {
    return this.quotationsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateQuotationDto, @Request() req): Promise<Quotation> {
    return this.quotationsService.create(dto, req.user.sub);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuotationDto,
  ): Promise<Quotation> {
    return this.quotationsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.quotationsService.remove(id);
    return { message: 'Quotation deleted successfully' };
  }

  @Post(':id/convert')
  async convert(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConvertQuotationDto,
    @Request() req,
  ): Promise<{ quotation: Quotation; sale: PosSale }> {
    return this.quotationsService.convertToInvoice(id, dto.storeId, req.user.sub);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PosSalesService } from './pos-sales.service';
import { PosSale } from '../entities/pos-sale.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePosSaleDto } from './dto/create-pos-sale.dto';

@Controller('pos-sales')
@UseGuards(JwtAuthGuard)
export class PosSalesController {
  constructor(private readonly posSalesService: PosSalesService) {}

  @Get()
  async findAll(): Promise<PosSale[]> {
    return this.posSalesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PosSale> {
    return this.posSalesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreatePosSaleDto, @Request() req): Promise<PosSale> {
    return this.posSalesService.create(dto, req.user.sub);
  }
}

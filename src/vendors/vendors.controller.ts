import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { Vendor } from '../entities/vendor.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vendors')
@UseGuards(JwtAuthGuard)
export class VendorsController {
  constructor(private readonly service: VendorsService) {}

  @Get()
  findAll(): Promise<Vendor[]> { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Vendor> { return this.service.findOne(id); }

  @Post()
  create(@Body() body: Partial<Vendor>): Promise<Vendor> { return this.service.create(body); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Vendor>): Promise<Vendor> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.service.remove(id);
    return { message: 'Vendor deleted' };
  }

  @Get(':id/ledger')
  getLedger(@Param('id', ParseIntPipe) id: number) {
    return this.service.getLedger(id);
  }
}

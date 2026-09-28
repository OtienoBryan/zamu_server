import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PartPurchaseOrdersService } from './part-purchase-orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('part-purchase-orders')
@UseGuards(JwtAuthGuard)
export class PartPurchaseOrdersController {
  constructor(private readonly service: PartPurchaseOrdersService) {}

  @Get()            findAll()                                                         { return this.service.findAll(); }
  @Get('next-po')   nextPO()                                                          { return this.service.generatePoNumber().then(n => ({ po_number: n })); }
  @Get(':id')       findOne(@Param('id', ParseIntPipe) id: number)                   { return this.service.findOne(id); }
  @Post()           create(@Body() body: any)                                         { return this.service.create(body); }
  @Put(':id/status') updateStatus(@Param('id', ParseIntPipe) id: number, @Body() b: any) { return this.service.updateStatus(id, b.status, b.store_id); }
  @Delete(':id')    async remove(@Param('id', ParseIntPipe) id: number)               { await this.service.remove(id); return { message: 'Deleted' }; }
}

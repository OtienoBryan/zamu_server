import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { SalesPostingsService } from './sales-postings.service';
import { CreateSalesPostingDto } from './dto/create-sales-posting.dto';
import { SalesPosting } from '../entities/sales-posting.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('sales-postings')
@UseGuards(JwtAuthGuard)
export class SalesPostingsController {
  constructor(private readonly salesPostingsService: SalesPostingsService) {}

  @Get()
  async findAll(@Query('stationId') stationId?: string): Promise<SalesPosting[]> {
    return this.salesPostingsService.findAll({
      stationId: stationId ? parseInt(stationId, 10) : undefined,
    });
  }

  @Post()
  async create(@Body() dto: CreateSalesPostingDto, @Request() req): Promise<SalesPosting> {
    const postedBy = req.user?.sub ?? null;
    return this.salesPostingsService.create(dto, postedBy);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateSalesPostingDto, @Request() req): Promise<SalesPosting> {
    const postedBy = req.user?.sub ?? null;
    return this.salesPostingsService.update(parseInt(id, 10), dto, postedBy);
  }
}

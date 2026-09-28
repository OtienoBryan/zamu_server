import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JobCardsService } from './job-cards.service';
import { JobCard } from '../entities/job-card.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateJobCardDto } from './dto/create-job-card.dto';
import { UpdateJobCardDto } from './dto/update-job-card.dto';
import { ConvertToInvoiceDto } from './dto/convert-to-invoice.dto';

@Controller('job-cards')
@UseGuards(JwtAuthGuard)
export class JobCardsController {
  constructor(private readonly jobCardsService: JobCardsService) {}

  @Get()
  async findAll(
    @Query('conversionVehicleId') conversionVehicleId?: string,
    @Query('conversionClientId') conversionClientId?: string,
  ): Promise<JobCard[]> {
    return this.jobCardsService.findAll(
      conversionVehicleId ? Number(conversionVehicleId) : undefined,
      conversionClientId ? Number(conversionClientId) : undefined,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<JobCard> {
    return this.jobCardsService.findOne(id);
  }

  @Post()
  async create(@Body() createJobCardDto: CreateJobCardDto): Promise<JobCard> {
    return this.jobCardsService.create(createJobCardDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateJobCardDto: UpdateJobCardDto): Promise<JobCard> {
    return this.jobCardsService.update(id, updateJobCardDto);
  }

  @Post(':id/convert-to-invoice')
  async convertToInvoice(@Param('id', ParseIntPipe) id: number, @Body() dto: ConvertToInvoiceDto): Promise<JobCard> {
    return this.jobCardsService.convertToInvoice(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.jobCardsService.remove(id);
    return { message: 'Job card deleted successfully' };
  }
}

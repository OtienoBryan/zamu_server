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
import { SparePartRequestsService } from './spare-part-requests.service';
import { SparePartRequest } from '../entities/spare-part-request.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSparePartRequestDto } from './dto/create-spare-part-request.dto';
import { FulfillSparePartRequestDto } from './dto/fulfill-spare-part-request.dto';

@Controller('spare-part-requests')
@UseGuards(JwtAuthGuard)
export class SparePartRequestsController {
  constructor(private readonly requestsService: SparePartRequestsService) {}

  @Get()
  async findAll(): Promise<SparePartRequest[]> {
    return this.requestsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SparePartRequest> {
    return this.requestsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateSparePartRequestDto, @Request() req): Promise<SparePartRequest> {
    return this.requestsService.create(dto, req.user.sub);
  }

  @Post(':id/fulfill')
  async fulfill(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FulfillSparePartRequestDto,
    @Request() req,
  ): Promise<SparePartRequest> {
    return this.requestsService.fulfill(id, dto, req.user.sub);
  }

  @Post(':id/cancel')
  async cancel(@Param('id', ParseIntPipe) id: number): Promise<SparePartRequest> {
    return this.requestsService.cancel(id);
  }
}

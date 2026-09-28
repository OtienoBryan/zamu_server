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
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from '../entities/job.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.jobsService.remove(id);
    return { message: 'Job deleted successfully' };
  }
}

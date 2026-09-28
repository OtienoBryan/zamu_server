import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { StationExpensesService } from './station-expenses.service';
import { StationExpense } from '../entities/station-expense.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStationExpenseDto } from './dto/create-station-expense.dto';
import { UpdateStationExpenseDto } from './dto/update-station-expense.dto';

@Controller('station-expenses')
@UseGuards(JwtAuthGuard)
export class StationExpensesController {
  constructor(private readonly stationExpensesService: StationExpensesService) {}

  @Get()
  async findAll(@Query('stationId') stationId?: string): Promise<StationExpense[]> {
    return this.stationExpensesService.findAll(stationId ? Number(stationId) : undefined);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StationExpense> {
    return this.stationExpensesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateStationExpenseDto, @Request() req): Promise<StationExpense> {
    return this.stationExpensesService.create(dto, req.user?.sub ?? null);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStationExpenseDto,
  ): Promise<StationExpense> {
    return this.stationExpensesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.stationExpensesService.remove(id);
    return { message: 'Expense deleted successfully' };
  }
}

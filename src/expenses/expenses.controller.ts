import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from '../entities/expense.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expensesService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateExpenseDto, @Request() req): Promise<Expense> {
    return this.expensesService.create(dto, req.user.sub);
  }
}

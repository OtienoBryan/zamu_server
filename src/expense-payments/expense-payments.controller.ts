import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ExpensePaymentsService } from './expense-payments.service';
import { ExpensePayment } from '../entities/expense-payment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExpensePaymentDto } from './dto/create-expense-payment.dto';

@Controller('expense-payments')
@UseGuards(JwtAuthGuard)
export class ExpensePaymentsController {
  constructor(private readonly expensePaymentsService: ExpensePaymentsService) {}

  @Get()
  async findAll(@Query('expenseId') expenseId?: string): Promise<ExpensePayment[]> {
    if (expenseId != null && expenseId !== '') {
      const id = Number(expenseId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('expenseId must be a number');
      }
      return this.expensePaymentsService.findForExpense(id);
    }
    return this.expensePaymentsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateExpensePaymentDto, @Request() req): Promise<ExpensePayment> {
    return this.expensePaymentsService.create(dto, req.user.sub);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.expensePaymentsService.remove(id);
    return { message: 'Expense payment deleted successfully' };
  }
}

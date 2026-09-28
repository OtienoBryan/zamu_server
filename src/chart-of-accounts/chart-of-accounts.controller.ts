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
import { ChartOfAccountsService, ChartOfAccountRow, PaymentMethodOption } from './chart-of-accounts.service';
import { AccountCategory } from '../entities/account-category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateChartOfAccountDto } from './dto/create-chart-of-account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-account.dto';

@Controller('chart-of-accounts')
@UseGuards(JwtAuthGuard)
export class ChartOfAccountsController {
  constructor(private readonly chartOfAccountsService: ChartOfAccountsService) {}

  @Get()
  async findAll(): Promise<ChartOfAccountRow[]> {
    return this.chartOfAccountsService.findAll();
  }

  @Get('categories')
  async findCategories(): Promise<AccountCategory[]> {
    return this.chartOfAccountsService.findCategories();
  }

  @Get('payment-methods')
  async findPaymentMethods(): Promise<PaymentMethodOption[]> {
    return this.chartOfAccountsService.findPaymentMethods();
  }

  @Get('expense-accounts')
  async findExpenseAccounts(): Promise<PaymentMethodOption[]> {
    return this.chartOfAccountsService.findExpenseAccounts();
  }

  @Post()
  async create(@Body() dto: CreateChartOfAccountDto): Promise<ChartOfAccountRow> {
    return this.chartOfAccountsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChartOfAccountDto,
  ): Promise<ChartOfAccountRow> {
    return this.chartOfAccountsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.chartOfAccountsService.remove(id);
    return { message: 'Chart of account deleted successfully' };
  }
}

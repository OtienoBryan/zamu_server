import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationExpense } from '../entities/station-expense.entity';
import { CreateStationExpenseDto } from './dto/create-station-expense.dto';
import { UpdateStationExpenseDto } from './dto/update-station-expense.dto';

const RELATIONS = ['station', 'user'];

@Injectable()
export class StationExpensesService {
  constructor(
    @InjectRepository(StationExpense)
    private expenseRepository: Repository<StationExpense>,
  ) {}

  async findAll(stationId?: number): Promise<StationExpense[]> {
    return this.expenseRepository.find({
      where: stationId ? { station_id: stationId } : {},
      relations: RELATIONS,
      order: { expense_date: 'DESC', id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<StationExpense> {
    const expense = await this.expenseRepository.findOne({ where: { id }, relations: RELATIONS });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  async create(dto: CreateStationExpenseDto, userId?: number | null): Promise<StationExpense> {
    const expense = this.expenseRepository.create({
      // comment and payment_method are NOT NULL in the schema, so never pass null.
      station_id: dto.station_id,
      user_id: dto.user_id ?? userId ?? 0,
      amount: dto.amount,
      expense_date: dto.expense_date,
      comment: dto.comment ?? '',
      payment_method: dto.payment_method,
    });
    const saved = await this.expenseRepository.save(expense);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateStationExpenseDto): Promise<StationExpense> {
    const expense = await this.findOne(id);
    Object.assign(expense, dto);
    await this.expenseRepository.save(expense);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const expense = await this.findOne(id);
    await this.expenseRepository.remove(expense);
  }
}

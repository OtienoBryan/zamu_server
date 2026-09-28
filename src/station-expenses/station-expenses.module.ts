import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationExpensesService } from './station-expenses.service';
import { StationExpensesController } from './station-expenses.controller';
import { StationExpense } from '../entities/station-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationExpense])],
  controllers: [StationExpensesController],
  providers: [StationExpensesService],
  exports: [StationExpensesService],
})
export class StationExpensesModule {}

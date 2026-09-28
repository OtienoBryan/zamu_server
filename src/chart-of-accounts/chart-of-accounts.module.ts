import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartOfAccountsService } from './chart-of-accounts.service';
import { ChartOfAccountsController } from './chart-of-accounts.controller';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { AccountCategory } from '../entities/account-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChartOfAccount, AccountCategory])],
  controllers: [ChartOfAccountsController],
  providers: [ChartOfAccountsService],
  exports: [ChartOfAccountsService],
})
export class ChartOfAccountsModule {}

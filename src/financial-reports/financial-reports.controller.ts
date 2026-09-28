import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  FinancialReportsService,
  TrialBalanceRow,
  JournalEntryLinesResult,
  AccountOption,
  ProfitAndLossReport,
} from './financial-reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TrialBalanceQueryDto } from './dto/trial-balance-query.dto';
import { JournalEntriesQueryDto } from './dto/journal-entries-query.dto';

@Controller('financial-reports')
@UseGuards(JwtAuthGuard)
export class FinancialReportsController {
  constructor(private readonly financialReportsService: FinancialReportsService) {}

  @Get('trial-balance')
  async getTrialBalance(@Query() query: TrialBalanceQueryDto): Promise<TrialBalanceRow[]> {
    return this.financialReportsService.getTrialBalance(query.startDate, query.endDate);
  }

  @Get('profit-and-loss')
  async getProfitAndLoss(@Query() query: TrialBalanceQueryDto): Promise<ProfitAndLossReport> {
    return this.financialReportsService.getProfitAndLoss(query.startDate, query.endDate);
  }

  @Get('accounts')
  async getAccounts(): Promise<AccountOption[]> {
    return this.financialReportsService.getAccountsList();
  }

  @Get('journal-entries')
  async getJournalEntries(@Query() query: JournalEntriesQueryDto): Promise<JournalEntryLinesResult> {
    return this.financialReportsService.getJournalEntryLines(query);
  }
}

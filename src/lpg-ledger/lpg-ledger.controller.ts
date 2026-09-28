import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LpgLedgerService } from './lpg-ledger.service';
import { StationLpgLedger } from '../entities/station-lpg-ledger.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stations/:stationId/lpg-ledger')
@UseGuards(JwtAuthGuard)
export class LpgLedgerController {
  constructor(private readonly lpgLedgerService: LpgLedgerService) {}

  @Get()
  async findAll(@Param('stationId', ParseIntPipe) stationId: number): Promise<StationLpgLedger[]> {
    return this.lpgLedgerService.findAllForStation(stationId);
  }
}

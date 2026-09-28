import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LpgLedgerService } from './lpg-ledger.service';
import { LpgLedgerController } from './lpg-ledger.controller';
import { StationLpgLedger } from '../entities/station-lpg-ledger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationLpgLedger])],
  controllers: [LpgLedgerController],
  providers: [LpgLedgerService],
  exports: [LpgLedgerService],
})
export class LpgLedgerModule {}

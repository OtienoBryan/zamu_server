import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationLpgLedger } from '../entities/station-lpg-ledger.entity';

@Injectable()
export class LpgLedgerService {
  constructor(
    @InjectRepository(StationLpgLedger)
    private ledgerRepository: Repository<StationLpgLedger>,
  ) {}

  /** Newest first — the running balance is read from the top down. */
  async findAllForStation(stationId: number): Promise<StationLpgLedger[]> {
    return this.ledgerRepository.find({
      where: { stationId },
      relations: ['createdByStaff'],
      order: { created_at: 'DESC', id: 'DESC' },
    });
  }
}

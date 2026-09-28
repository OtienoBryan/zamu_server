import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationTanksService } from './station-tanks.service';
import { StationTanksController } from './station-tanks.controller';
import { StationTank } from '../entities/station-tank.entity';
import { Station } from '../entities/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationTank, Station])],
  controllers: [StationTanksController],
  providers: [StationTanksService],
  exports: [StationTanksService],
})
export class StationTanksModule {}

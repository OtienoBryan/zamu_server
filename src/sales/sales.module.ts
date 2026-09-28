import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { Sale } from '../entities/sale.entity';
import { Station } from '../entities/station.entity';
import { KeyAccount } from '../entities/key-account.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { ConversionClient } from '../entities/conversion-client.entity';
import { ConversionVehicle } from '../entities/conversion-vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Station, KeyAccount, Vehicle, ConversionClient, ConversionVehicle]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}


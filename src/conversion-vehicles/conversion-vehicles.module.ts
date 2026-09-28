import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionVehiclesService } from './conversion-vehicles.service';
import { VehicleAnalysisService } from './services/vehicle-analysis.service';
import { ConversionVehiclesController } from './conversion-vehicles.controller';
import { ConversionVehicle } from '../entities/conversion-vehicle.entity';
import { ConversionClient } from '../entities/conversion-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionVehicle, ConversionClient])],
  controllers: [ConversionVehiclesController],
  providers: [ConversionVehiclesService, VehicleAnalysisService],
  exports: [ConversionVehiclesService, VehicleAnalysisService],
})
export class ConversionVehiclesModule {}

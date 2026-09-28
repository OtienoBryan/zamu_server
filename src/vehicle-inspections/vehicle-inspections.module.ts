import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleInspectionsService } from './vehicle-inspections.service';
import { VehicleInspectionsController } from './vehicle-inspections.controller';
import { VehicleInspection } from '../entities/vehicle-inspection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleInspection])],
  controllers: [VehicleInspectionsController],
  providers: [VehicleInspectionsService],
  exports: [VehicleInspectionsService],
})
export class VehicleInspectionsModule {}

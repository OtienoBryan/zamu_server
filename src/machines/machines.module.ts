import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { Machine } from '../entities/machine.entity';
import { MachineCategory } from '../entities/machine-category.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine, MachineCategory, RawMaterialStore])],
  controllers: [MachinesController],
  providers: [MachinesService],
  exports: [MachinesService],
})
export class MachinesModule {}

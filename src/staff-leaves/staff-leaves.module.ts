import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffLeavesService } from './staff-leaves.service';
import { StaffLeavesController } from './staff-leaves.controller';
import { StaffLeave } from '../entities/staff-leave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffLeave])],
  controllers: [StaffLeavesController],
  providers: [StaffLeavesService],
  exports: [StaffLeavesService],
})
export class StaffLeavesModule {}

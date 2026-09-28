import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMemberLeavesService } from './staff-member-leaves.service';
import { StaffMemberLeavesController } from './staff-member-leaves.controller';
import { StaffMemberLeave } from '../entities/staff-member-leave.entity';
import { StaffMember } from '../entities/staff-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMemberLeave, StaffMember])],
  controllers: [StaffMemberLeavesController],
  providers: [StaffMemberLeavesService],
  exports: [StaffMemberLeavesService],
})
export class StaffMemberLeavesModule {}

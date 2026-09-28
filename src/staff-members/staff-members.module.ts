import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMembersService } from './staff-members.service';
import { StaffMembersController } from './staff-members.controller';
import { StaffMember } from '../entities/staff-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember])],
  controllers: [StaffMembersController],
  providers: [StaffMembersService],
  exports: [StaffMembersService],
})
export class StaffMembersModule {}

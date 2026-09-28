import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { StaffMembersService } from './staff-members.service';
import { StaffMember } from '../entities/staff-member.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';

@Controller('staff-members')
@UseGuards(JwtAuthGuard)
export class StaffMembersController {
  constructor(private readonly staffMembersService: StaffMembersService) {}

  @Get()
  async findAll(): Promise<StaffMember[]> {
    return this.staffMembersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StaffMember> {
    return this.staffMembersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateStaffMemberDto): Promise<StaffMember> {
    return this.staffMembersService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStaffMemberDto,
  ): Promise<StaffMember> {
    return this.staffMembersService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.staffMembersService.remove(id);
    return { message: 'Staff member deleted successfully' };
  }
}

import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OmcsService } from './omcs.service';
import { Omc } from '../entities/omc.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('omcs')
@UseGuards(JwtAuthGuard)
export class OmcsController {
  constructor(private readonly service: OmcsService) {}

  @Get()
  findAll(): Promise<Omc[]> { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Omc> { return this.service.findOne(id); }

  @Post()
  create(@Body() body: Partial<Omc>): Promise<Omc> { return this.service.create(body); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Omc>): Promise<Omc> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.service.remove(id);
    return { message: 'OMC deleted' };
  }
}

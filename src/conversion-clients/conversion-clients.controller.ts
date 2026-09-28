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
import { ConversionClientsService } from './conversion-clients.service';
import { ConversionClient } from '../entities/conversion-client.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateConversionClientDto } from './dto/create-conversion-client.dto';
import { UpdateConversionClientDto } from './dto/update-conversion-client.dto';

@Controller('conversion-clients')
@UseGuards(JwtAuthGuard)
export class ConversionClientsController {
  constructor(private readonly conversionClientsService: ConversionClientsService) {}

  @Get()
  async findAll(): Promise<ConversionClient[]> {
    return this.conversionClientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ConversionClient> {
    return this.conversionClientsService.findOne(id);
  }

  @Post()
  async create(@Body() createConversionClientDto: CreateConversionClientDto): Promise<ConversionClient> {
    return this.conversionClientsService.create(createConversionClientDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConversionClientDto: UpdateConversionClientDto,
  ): Promise<ConversionClient> {
    return this.conversionClientsService.update(id, updateConversionClientDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.conversionClientsService.remove(id);
    return { message: 'Conversion client deleted successfully' };
  }
}

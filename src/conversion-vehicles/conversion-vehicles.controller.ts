import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ConversionVehiclesService } from './conversion-vehicles.service';
import { VehicleAnalysisService } from './services/vehicle-analysis.service';
import { ConversionVehicle } from '../entities/conversion-vehicle.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateConversionVehicleDto } from './dto/create-conversion-vehicle.dto';
import { UpdateConversionVehicleDto } from './dto/update-conversion-vehicle.dto';
import { AnalyzeVehicleImageDto, VehicleAnalysisResult } from './dto/analyze-vehicle-image.dto';

@Controller('conversion-vehicles')
@UseGuards(JwtAuthGuard)
export class ConversionVehiclesController {
  constructor(
    private readonly conversionVehiclesService: ConversionVehiclesService,
    private readonly vehicleAnalysisService: VehicleAnalysisService,
  ) {}

  @Get()
  async findAll(@Query('conversionClientId') conversionClientId?: string): Promise<ConversionVehicle[]> {
    if (conversionClientId) {
      const clientId = parseInt(conversionClientId, 10);
      if (isNaN(clientId)) {
        throw new Error('conversionClientId must be a valid number');
      }
      return this.conversionVehiclesService.findByConversionClient(clientId);
    }
    return this.conversionVehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ConversionVehicle> {
    return this.conversionVehiclesService.findOne(id);
  }

  @Post()
  async create(@Body() createConversionVehicleDto: CreateConversionVehicleDto): Promise<ConversionVehicle> {
    return this.conversionVehiclesService.create(createConversionVehicleDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConversionVehicleDto: UpdateConversionVehicleDto,
  ): Promise<ConversionVehicle> {
    return this.conversionVehiclesService.update(id, updateConversionVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.conversionVehiclesService.remove(id);
    return { message: 'Conversion vehicle deleted successfully' };
  }

  @Post('analyze-image')
  async analyzeImage(@Body() analyzeDto: AnalyzeVehicleImageDto): Promise<VehicleAnalysisResult> {
    return this.vehicleAnalysisService.analyzeVehicleImage(analyzeDto.imageUrl);
  }
}

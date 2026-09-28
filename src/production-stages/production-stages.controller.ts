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
import { ProductionStagesService } from './production-stages.service';
import { ProductionStage } from '../entities/production-stage.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductionStageDto } from './dto/create-production-stage.dto';
import { UpdateProductionStageDto } from './dto/update-production-stage.dto';

@Controller('production-stages')
@UseGuards(JwtAuthGuard)
export class ProductionStagesController {
  constructor(private readonly productionStagesService: ProductionStagesService) {}

  @Get()
  async findAll(): Promise<ProductionStage[]> {
    return this.productionStagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductionStage> {
    return this.productionStagesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateProductionStageDto): Promise<ProductionStage> {
    return this.productionStagesService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductionStageDto,
  ): Promise<ProductionStage> {
    return this.productionStagesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.productionStagesService.remove(id);
    return { message: 'Production stage deleted successfully' };
  }
}

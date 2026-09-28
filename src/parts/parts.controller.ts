import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete,
  Body, 
  Param, 
  ParseIntPipe,
  UseGuards 
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { Part } from '../entities/part.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller('parts')
@UseGuards(JwtAuthGuard)
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get()
  async findAll(): Promise<Part[]> {
    console.log('📦 [PartsController] GET /parts');
    return this.partsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Part> {
    console.log(`📦 [PartsController] GET /parts/${id}`);
    return this.partsService.findOne(id);
  }

  @Post()
  async create(@Body() createPartDto: CreatePartDto): Promise<Part> {
    console.log('📦 [PartsController] POST /parts');
    console.log('📦 [PartsController] Create part data:', createPartDto);
    return this.partsService.create(createPartDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartDto: UpdatePartDto
  ): Promise<Part> {
    console.log(`📦 [PartsController] PUT /parts/${id}`);
    console.log('📦 [PartsController] Update part data:', updatePartDto);
    return this.partsService.update(id, updatePartDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    console.log(`📦 [PartsController] DELETE /parts/${id}`);
    await this.partsService.remove(id);
    return { message: 'Part deleted successfully' };
  }
}


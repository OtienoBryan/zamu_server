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
import { StoresService } from './stores.service';
import { Store } from '../entities/store.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(): Promise<Store[]> {
    console.log('🏪 [StoresController] GET /stores');
    return this.storesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Store> {
    console.log(`🏪 [StoresController] GET /stores/${id}`);
    return this.storesService.findOne(id);
  }

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    console.log('🏪 [StoresController] POST /stores');
    console.log('🏪 [StoresController] Create store data:', createStoreDto);
    return this.storesService.create(createStoreDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto
  ): Promise<Store> {
    console.log(`🏪 [StoresController] PUT /stores/${id}`);
    console.log('🏪 [StoresController] Update store data:', updateStoreDto);
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    console.log(`🏪 [StoresController] DELETE /stores/${id}`);
    await this.storesService.remove(id);
    return { message: 'Store deleted successfully' };
  }
}




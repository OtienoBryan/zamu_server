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
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FinishedProductsService } from './finished-products.service';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductCategory } from '../entities/finished-product-category.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';
import { AddMaterialDto } from './dto/add-material.dto';
import { UpdateMaterialQuantityDto } from './dto/update-material-quantity.dto';

@Controller('finished-products')
@UseGuards(JwtAuthGuard)
export class FinishedProductsController {
  constructor(private readonly finishedProductsService: FinishedProductsService) {}

  // Static routes first so they aren't parsed as ':id'
  @Get('categories')
  async findAllCategories(): Promise<FinishedProductCategory[]> {
    return this.finishedProductsService.findAllCategories();
  }

  @Post('categories')
  async createCategory(@Body('name') name: string): Promise<FinishedProductCategory> {
    return this.finishedProductsService.createCategory(name);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ url: string; publicId: string }> {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return this.finishedProductsService.uploadImage(file);
  }

  @Get()
  async findAll(): Promise<FinishedProduct[]> {
    return this.finishedProductsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<FinishedProduct> {
    return this.finishedProductsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateFinishedProductDto): Promise<FinishedProduct> {
    return this.finishedProductsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFinishedProductDto,
  ): Promise<FinishedProduct> {
    return this.finishedProductsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.finishedProductsService.remove(id);
    return { message: 'Finished product deleted successfully' };
  }

  // ── Bill of materials ──
  @Get(':id/materials')
  async findMaterials(@Param('id', ParseIntPipe) id: number): Promise<FinishedProductMaterial[]> {
    return this.finishedProductsService.findMaterials(id);
  }

  @Post(':id/materials')
  async addMaterial(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddMaterialDto,
  ): Promise<FinishedProductMaterial[]> {
    return this.finishedProductsService.addMaterial(id, dto);
  }

  @Put(':id/materials/:lineId')
  async updateMaterialQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Param('lineId', ParseIntPipe) lineId: number,
    @Body() dto: UpdateMaterialQuantityDto,
  ): Promise<FinishedProductMaterial[]> {
    return this.finishedProductsService.updateMaterialQuantity(id, lineId, dto);
  }

  @Delete(':id/materials/:lineId')
  async removeMaterial(
    @Param('id', ParseIntPipe) id: number,
    @Param('lineId', ParseIntPipe) lineId: number,
  ): Promise<FinishedProductMaterial[]> {
    return this.finishedProductsService.removeMaterial(id, lineId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    console.log('📁 [CategoriesService] Finding all categories');
    
    const categories = await this.categoryRepository.find({
      order: { name: 'ASC' },
    });
    
    console.log(`✅ [CategoriesService] Found ${categories.length} categories`);
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    console.log(`📁 [CategoriesService] Finding category by ID: ${id}`);
    
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    console.log('📁 [CategoriesService] Creating new category:', createCategoryDto.name);
    
    // Check if category name already exists
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });
    
    if (existingCategory) {
      throw new Error(`Category with name "${createCategoryDto.name}" already exists`);
    }
    
    try {
      const category = this.categoryRepository.create({
        name: createCategoryDto.name,
        description: createCategoryDto.description || null,
      });
      
      const savedCategory = await this.categoryRepository.save(category);
      console.log(`✅ [CategoriesService] Category created with ID: ${savedCategory.id}`);
      
      return savedCategory;
    } catch (error) {
      console.error('❌ [CategoriesService] Error creating category:', error);
      throw error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    console.log(`📁 [CategoriesService] Updating category with ID: ${id}`);
    
    const category = await this.findOne(id);
    
    // If name is being updated, check for duplicates
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });
      
      if (existingCategory) {
        throw new Error(`Category with name "${updateCategoryDto.name}" already exists`);
      }
    }
    
    Object.assign(category, updateCategoryDto);
    const updatedCategory = await this.categoryRepository.save(category);
    console.log(`✅ [CategoriesService] Category updated: ${updatedCategory.name}`);
    
    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    console.log(`📁 [CategoriesService] Deleting category with ID: ${id}`);
    
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    console.log(`✅ [CategoriesService] Category deleted: ${category.name}`);
  }
}

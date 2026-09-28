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
  UseGuards 
} from '@nestjs/common';
import { KeyAccountsService } from './key-accounts.service';
import { KeyAccount } from '../entities/key-account.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateKeyAccountDto } from './dto/create-key-account.dto';
import { UpdateKeyAccountDto } from './dto/update-key-account.dto';

@Controller('key-accounts')
@UseGuards(JwtAuthGuard)
export class KeyAccountsController {
  constructor(private readonly keyAccountsService: KeyAccountsService) {}

  @Get()
  async findAll(@Query('type') type?: 'client' | 'key_account'): Promise<KeyAccount[]> {
    console.log('🏢 [KeyAccountsController] GET /key-accounts', type ? `with type: ${type}` : '');
    return this.keyAccountsService.findAll(type);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<KeyAccount> {
    console.log(`🏢 [KeyAccountsController] GET /key-accounts/${id}`);
    return this.keyAccountsService.findOne(id);
  }

  @Post()
  async create(@Body() createKeyAccountDto: CreateKeyAccountDto): Promise<KeyAccount> {
    console.log('🏢 [KeyAccountsController] POST /key-accounts');
    console.log('🏢 [KeyAccountsController] Create key account data:', JSON.stringify(createKeyAccountDto, null, 2));
    try {
      const result = await this.keyAccountsService.create(createKeyAccountDto);
      console.log('✅ [KeyAccountsController] Key account created successfully:', result.id);
      return result;
    } catch (error) {
      console.error('❌ [KeyAccountsController] Error in create:', error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKeyAccountDto: UpdateKeyAccountDto
  ): Promise<KeyAccount> {
    console.log(`🏢 [KeyAccountsController] PUT /key-accounts/${id}`);
    console.log('🏢 [KeyAccountsController] Update key account data:', updateKeyAccountDto);
    return this.keyAccountsService.update(id, updateKeyAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    console.log(`🏢 [KeyAccountsController] DELETE /key-accounts/${id}`);
    await this.keyAccountsService.remove(id);
    return { message: 'Key account deleted successfully' };
  }
}


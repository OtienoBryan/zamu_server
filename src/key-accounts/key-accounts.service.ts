import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyAccount } from '../entities/key-account.entity';
import { CreateKeyAccountDto } from './dto/create-key-account.dto';
import { UpdateKeyAccountDto } from './dto/update-key-account.dto';

@Injectable()
export class KeyAccountsService {
  constructor(
    @InjectRepository(KeyAccount)
    private keyAccountRepository: Repository<KeyAccount>,
  ) {}

  async findAll(type?: 'client' | 'key_account'): Promise<KeyAccount[]> {
    console.log('🏢 [KeyAccountsService] Finding all key accounts', type ? `with type: ${type}` : '');
    
    const whereCondition = type ? { type } : {};
    
    const keyAccounts = await this.keyAccountRepository.find({
      where: whereCondition,
      order: { name: 'ASC' },
    });
    
    console.log(`✅ [KeyAccountsService] Found ${keyAccounts.length} key accounts`);
    return keyAccounts;
  }

  async findOne(id: number): Promise<KeyAccount> {
    console.log(`🏢 [KeyAccountsService] Finding key account by ID: ${id}`);
    
    const keyAccount = await this.keyAccountRepository.findOne({
      where: { id },
    });
    
    if (!keyAccount) {
      console.log(`❌ [KeyAccountsService] Key account with ID ${id} not found`);
      throw new NotFoundException(`Key account with ID ${id} not found`);
    }
    
    console.log(`✅ [KeyAccountsService] Key account found: ${keyAccount.name}`);
    return keyAccount;
  }

  async create(createKeyAccountDto: CreateKeyAccountDto): Promise<KeyAccount> {
    console.log('🏢 [KeyAccountsService] Creating new key account:', createKeyAccountDto.name);
    console.log('🏢 [KeyAccountsService] DTO data:', JSON.stringify(createKeyAccountDto, null, 2));
    
    const accountType = createKeyAccountDto.type || 'key_account';
    
    // Generate unique account number if not provided
    let accountNumber = createKeyAccountDto.account_number;
    
    if (!accountNumber || accountNumber.trim() === '') {
      // Generate a unique account number
      accountNumber = await this.generateUniqueAccountNumber(accountType);
    } else {
      // Check if provided account number already exists
      const existingAccount = await this.keyAccountRepository.findOne({
        where: { account_number: accountNumber },
      });
      
      if (existingAccount) {
        throw new Error(`Account number ${accountNumber} already exists`);
      }
    }
    
    try {
      const keyAccount = this.keyAccountRepository.create({
        name: createKeyAccountDto.name,
        email: createKeyAccountDto.email,
        contact: createKeyAccountDto.contact,
        account_number: accountNumber,
        type: accountType,
        description: createKeyAccountDto.description || null,
        region: createKeyAccountDto.region || null,
        is_active: createKeyAccountDto.is_active !== undefined ? createKeyAccountDto.is_active : 1,
      });
      
      const savedKeyAccount = await this.keyAccountRepository.save(keyAccount);
      console.log(`✅ [KeyAccountsService] Key account created with ID: ${savedKeyAccount.id}, Type: ${savedKeyAccount.type}, Account Number: ${savedKeyAccount.account_number}`);
      
      return savedKeyAccount;
    } catch (error) {
      console.error('❌ [KeyAccountsService] Error creating key account:', error);
      throw error;
    }
  }

  private async generateUniqueAccountNumber(type: 'client' | 'key_account'): Promise<string> {
    const prefix = type === 'client' ? 'CLT' : 'KA';
    let accountNumber: string = '';
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!isUnique && attempts < maxAttempts) {
      // Generate account number: prefix + timestamp + random 4 digits
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      accountNumber = `${prefix}-${timestamp}-${random}`;

      // Check if it already exists
      const existing = await this.keyAccountRepository.findOne({
        where: { account_number: accountNumber },
      });

      if (!existing) {
        isUnique = true;
      } else {
        attempts++;
        // Small delay to ensure different timestamp if needed
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    }

    if (!isUnique || !accountNumber) {
      throw new Error('Failed to generate unique account number after multiple attempts');
    }

    return accountNumber;
  }

  async update(id: number, updateKeyAccountDto: UpdateKeyAccountDto): Promise<KeyAccount> {
    console.log(`🏢 [KeyAccountsService] Updating key account with ID: ${id}`);
    console.log('🏢 [KeyAccountsService] Update data:', JSON.stringify(updateKeyAccountDto, null, 2));
    
    const keyAccount = await this.keyAccountRepository.findOne({ where: { id } });
    
    if (!keyAccount) {
      throw new NotFoundException(`Key account with ID ${id} not found`);
    }
    
    // If account_number is being updated, check if it already exists
    if (updateKeyAccountDto.account_number && updateKeyAccountDto.account_number !== keyAccount.account_number) {
      const existingAccount = await this.keyAccountRepository.findOne({
        where: { account_number: updateKeyAccountDto.account_number },
      });
      
      if (existingAccount) {
        throw new Error(`Account number ${updateKeyAccountDto.account_number} already exists`);
      }
    }
    
    Object.assign(keyAccount, updateKeyAccountDto);
    const updatedKeyAccount = await this.keyAccountRepository.save(keyAccount);
    console.log(`✅ [KeyAccountsService] Key account updated: ${updatedKeyAccount.name}`);
    
    return updatedKeyAccount;
  }

  async remove(id: number): Promise<void> {
    console.log(`🏢 [KeyAccountsService] Deleting key account with ID: ${id}`);
    
    const keyAccount = await this.keyAccountRepository.findOne({ where: { id } });
    
    if (!keyAccount) {
      throw new NotFoundException(`Key account with ID ${id} not found`);
    }
    
    await this.keyAccountRepository.remove(keyAccount);
    console.log(`✅ [KeyAccountsService] Key account deleted: ${keyAccount.name}`);
  }
}


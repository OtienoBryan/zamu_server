import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversionClient } from '../entities/conversion-client.entity';
import { CreateConversionClientDto } from './dto/create-conversion-client.dto';
import { UpdateConversionClientDto } from './dto/update-conversion-client.dto';

@Injectable()
export class ConversionClientsService {
  constructor(
    @InjectRepository(ConversionClient)
    private conversionClientRepository: Repository<ConversionClient>,
  ) {}

  async findAll(): Promise<ConversionClient[]> {
    return this.conversionClientRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<ConversionClient> {
    const client = await this.conversionClientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Conversion client with ID ${id} not found`);
    }

    return client;
  }

  async create(createConversionClientDto: CreateConversionClientDto): Promise<ConversionClient> {
    const client = this.conversionClientRepository.create({
      name: createConversionClientDto.name,
      first_name: createConversionClientDto.first_name || null,
      middle_name: createConversionClientDto.middle_name || null,
      surname: createConversionClientDto.surname || null,
      email: createConversionClientDto.email || null,
      contact: createConversionClientDto.contact,
      address: createConversionClientDto.address || null,
      description: createConversionClientDto.description || null,
      region: createConversionClientDto.region || null,
      category: createConversionClientDto.category || 'individual',
      organization_type: createConversionClientDto.organization_type || null,
      organization_name: createConversionClientDto.organization_name || null,
      tax_pin: createConversionClientDto.tax_pin || null,
      referral_source: createConversionClientDto.referral_source || null,
      referral_notes: createConversionClientDto.referral_notes || null,
      tax_exempt: createConversionClientDto.tax_exempt !== undefined ? createConversionClientDto.tax_exempt : 0,
      apply_discount: createConversionClientDto.apply_discount !== undefined ? createConversionClientDto.apply_discount : 0,
      discount_rate: createConversionClientDto.discount_rate?.toString() ?? null,
      labour_rate_override: createConversionClientDto.labour_rate_override !== undefined ? createConversionClientDto.labour_rate_override : 0,
      labour_rate: createConversionClientDto.labour_rate?.toString() ?? null,
      parts_markup_override: createConversionClientDto.parts_markup_override !== undefined ? createConversionClientDto.parts_markup_override : 0,
      parts_markup: createConversionClientDto.parts_markup?.toString() ?? null,
      payment_terms_override: createConversionClientDto.payment_terms_override !== undefined ? createConversionClientDto.payment_terms_override : 0,
      payment_terms: createConversionClientDto.payment_terms || null,
      is_active: createConversionClientDto.is_active !== undefined ? createConversionClientDto.is_active : 1,
      account_number: await this.generateUniqueAccountNumber(),
    });

    return this.conversionClientRepository.save(client);
  }

  private async generateUniqueAccountNumber(): Promise<string> {
    let sequence = (await this.conversionClientRepository.count()) + 1;
    let accountNumber = '';
    let isUnique = false;

    while (!isUnique) {
      accountNumber = `MT-${String(sequence).padStart(4, '0')}`;
      const existing = await this.conversionClientRepository.findOne({ where: { account_number: accountNumber } });
      isUnique = !existing;
      sequence++;
    }

    return accountNumber;
  }

  async update(id: number, updateConversionClientDto: UpdateConversionClientDto): Promise<ConversionClient> {
    const client = await this.findOne(id);
    Object.assign(client, updateConversionClientDto);
    return this.conversionClientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.conversionClientRepository.remove(client);
  }
}

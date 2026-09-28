import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Quotation } from '../entities/quotation.entity';
import { QuotationItem } from '../entities/quotation-item.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { ClientRecord } from '../entities/client-record.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PosSalesService } from '../pos-sales/pos-sales.service';

const RELATIONS = ['items', 'items.product', 'client', 'createdByStaff', 'convertedSale'];

@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(Quotation)
    private quotationRepository: Repository<Quotation>,
    @InjectRepository(FinishedProduct)
    private productRepository: Repository<FinishedProduct>,
    @InjectRepository(ClientRecord)
    private clientRepository: Repository<ClientRecord>,
    private dataSource: DataSource,
    private posSalesService: PosSalesService,
  ) {}

  // createdByStaff pulls from the `staff` login table, which also carries a
  // password hash — redact it down to id/name before it ever leaves this service.
  private redactStaff(quotation: Quotation): Quotation {
    if (quotation.createdByStaff) {
      quotation.createdByStaff = { id: quotation.createdByStaff.id, name: quotation.createdByStaff.name } as Quotation['createdByStaff'];
    }
    return quotation;
  }

  async findAll(): Promise<Quotation[]> {
    const quotations = await this.quotationRepository.find({
      relations: RELATIONS,
      order: { createdAt: 'DESC' },
    });
    return quotations.map((q) => this.redactStaff(q));
  }

  async findOne(id: number): Promise<Quotation> {
    const quotation = await this.quotationRepository.findOne({ where: { id }, relations: RELATIONS });
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return this.redactStaff(quotation);
  }

  private async validateReferences(dto: CreateQuotationDto): Promise<void> {
    const productIds = dto.items.map((i) => i.productId);
    const [products, client] = await Promise.all([
      this.productRepository.find({ where: { id: In(productIds) } }),
      dto.clientId != null ? this.clientRepository.findOne({ where: { id: dto.clientId } }) : Promise.resolve(null),
    ]);
    const productMap = new Map(products.map((p) => [p.id, p]));
    for (const item of dto.items) {
      if (!productMap.has(item.productId)) {
        throw new NotFoundException(`Finished product with ID ${item.productId} not found`);
      }
    }
    if (dto.clientId != null && !client) {
      throw new NotFoundException(`Client with ID ${dto.clientId} not found`);
    }
  }

  // A quotation is just a priced proposal — unlike a POS sale it never touches
  // stock or posts to the ledger, since nothing has actually been sold yet.
  async create(dto: CreateQuotationDto, createdBy: number): Promise<Quotation> {
    await this.validateReferences(dto);

    const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const taxRate = dto.taxRate ?? 16;
    const taxAmount = subtotal * (taxRate / 100);
    const totalAmount = subtotal + taxAmount;

    const savedId = await this.dataSource.transaction(async (manager) => {
      const quotation = manager.create(Quotation, {
        clientId: dto.clientId ?? null,
        subtotal,
        taxRate,
        taxAmount,
        totalAmount,
        validUntil: dto.validUntil ?? null,
        notes: dto.notes ?? null,
        createdBy,
      });
      const savedQuotation = await manager.save(Quotation, quotation);

      const items = dto.items.map((i) =>
        manager.create(QuotationItem, {
          quotationId: savedQuotation.id,
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.quantity * i.unitPrice,
        }),
      );
      await manager.save(QuotationItem, items);

      return savedQuotation.id;
    });

    return this.findOne(savedId);
  }

  // Edits always replace the whole quotation — same shape as create, just
  // against an existing row. Still never touches stock or the ledger.
  async update(id: number, dto: UpdateQuotationDto): Promise<Quotation> {
    const existing = await this.quotationRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    if (existing.convertedSaleId != null) {
      throw new ConflictException('This quotation has already been converted to an invoice and can no longer be edited');
    }
    await this.validateReferences(dto);

    const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const taxRate = dto.taxRate ?? 16;
    const taxAmount = subtotal * (taxRate / 100);
    const totalAmount = subtotal + taxAmount;

    await this.dataSource.transaction(async (manager) => {
      await manager.update(Quotation, id, {
        clientId: dto.clientId ?? null,
        subtotal,
        taxRate,
        taxAmount,
        totalAmount,
        validUntil: dto.validUntil ?? null,
        notes: dto.notes ?? null,
      });

      await manager.delete(QuotationItem, { quotationId: id });
      const items = dto.items.map((i) =>
        manager.create(QuotationItem, {
          quotationId: id,
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.quantity * i.unitPrice,
        }),
      );
      await manager.save(QuotationItem, items);
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const quotation = await this.quotationRepository.findOne({ where: { id } });
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    if (quotation.convertedSaleId != null) {
      throw new ConflictException('This quotation has already been converted to an invoice and can no longer be deleted');
    }
    await this.quotationRepository.remove(quotation);
  }

  // Turns the quotation into a real POS sale (invoice) — reuses PosSalesService
  // so inventory deduction, the receivable/revenue/tax/COGS journal entries, and
  // (via the sale's clientId) the client's outstanding balance on Receivables
  // all go through the exact same path a normal POS sale does.
  async convertToInvoice(id: number, storeId: number, createdBy: number): Promise<{ quotation: Quotation; sale: PosSale }> {
    const quotation = await this.quotationRepository.findOne({ where: { id }, relations: ['items'] });
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    if (quotation.convertedSaleId != null) {
      throw new ConflictException('This quotation has already been converted to an invoice');
    }

    const sale = await this.posSalesService.create(
      {
        clientId: quotation.clientId ?? undefined,
        storeId,
        items: quotation.items.map((i) => ({
          productId: i.productId,
          quantity: Number(i.quantity),
          unitPrice: Number(i.unitPrice),
        })),
        taxRate: Number(quotation.taxRate),
      },
      createdBy,
    );

    await this.quotationRepository.update(id, { convertedSaleId: sale.id });

    return { quotation: await this.findOne(id), sale };
  }
}

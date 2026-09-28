import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartPurchaseOrder } from '../entities/part-purchase-order.entity';
import { PartPurchaseOrderItem } from '../entities/part-purchase-order-item.entity';
import { Inventory } from '../entities/inventory.entity';
import { InventoryLedger } from '../entities/inventory-ledger.entity';
import { Vendor } from '../entities/vendor.entity';
import { VendorLedger } from '../entities/vendor-ledger.entity';

interface CreatePODto {
  vendor_id: number;
  store_id?: number | null;
  order_date: string;
  expected_delivery_date?: string | null;
  notes?: string | null;
  items: { part_id: number; quantity: number; unit_price: number }[];
}

@Injectable()
export class PartPurchaseOrdersService {
  constructor(
    @InjectRepository(PartPurchaseOrder)  private poRepo: Repository<PartPurchaseOrder>,
    @InjectRepository(PartPurchaseOrderItem) private itemRepo: Repository<PartPurchaseOrderItem>,
    @InjectRepository(Inventory)          private invRepo: Repository<Inventory>,
    @InjectRepository(InventoryLedger)    private invLedgerRepo: Repository<InventoryLedger>,
    @InjectRepository(Vendor)             private vendorRepo: Repository<Vendor>,
    @InjectRepository(VendorLedger)       private vendorLedgerRepo: Repository<VendorLedger>,
  ) {}

  findAll(): Promise<PartPurchaseOrder[]> {
    return this.poRepo.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number): Promise<PartPurchaseOrder> {
    const po = await this.poRepo.findOne({ where: { id } });
    if (!po) throw new NotFoundException(`PO ${id} not found`);
    return po;
  }

  async generatePoNumber(): Promise<string> {
    const today  = new Date();
    const prefix = `PO-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-`;
    const last   = await this.poRepo
      .createQueryBuilder('po')
      .where('po.po_number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('po.po_number', 'DESC')
      .getOne();
    const seq = last ? parseInt(last.po_number.split('-').pop() || '0', 10) + 1 : 1;
    return `${prefix}${String(seq).padStart(4, '0')}`;
  }

  async create(dto: CreatePODto): Promise<PartPurchaseOrder> {
    const po_number  = await this.generatePoNumber();
    const subtotal   = dto.items.reduce((s, i) => s + i.quantity * i.unit_price, 0);

    const po = this.poRepo.create({
      po_number,
      vendor_id:              dto.vendor_id,
      store_id:               dto.store_id ?? null,
      order_date:             dto.order_date,
      expected_delivery_date: dto.expected_delivery_date ?? null,
      notes:                  dto.notes ?? null,
      status:                 'draft',
      subtotal,
      total_amount:           subtotal,
    });
    const saved = await this.poRepo.save(po);

    await this.itemRepo.save(
      dto.items.map(i => this.itemRepo.create({
        purchase_order_id: saved.id,
        part_id:           i.part_id,
        quantity:          i.quantity,
        unit_price:        i.unit_price,
        total_price:       i.quantity * i.unit_price,
      }))
    );

    return this.findOne(saved.id);
  }

  async updateStatus(id: number, status: string, incomingStoreId?: number): Promise<PartPurchaseOrder> {
    const po = await this.poRepo.findOne({ where: { id }, relations: ['items'] });
    if (!po) throw new NotFoundException(`PO ${id} not found`);

    const prevStatus = po.status;

    /* Allow overriding store_id at receive time */
    if (incomingStoreId) po.store_id = incomingStoreId;

    po.status = status as any;
    await this.poRepo.save(po);

    if (status === 'received' && prevStatus !== 'received') {
      if (!po.store_id) throw new BadRequestException('No store assigned — cannot receive without a store');

      /* ── 1. Inventory IN for each item ── */
      for (const item of po.items) {
        let inv = await this.invRepo.findOne({
          where: { store_id: po.store_id as number, part_id: item.part_id },
        });
        const prevQty = inv ? inv.quantity : 0;
        const newQty  = prevQty + item.quantity;

        if (inv) {
          inv.quantity = newQty;
          await this.invRepo.save(inv);
        } else {
          inv = await this.invRepo.save(this.invRepo.create({
            store_id: po.store_id as number,
            part_id:  item.part_id,
            quantity: newQty,
          }));
        }

        await this.invLedgerRepo.save(this.invLedgerRepo.create({
          inventory_id:      inv.id,
          store_id:          po.store_id as number,
          part_id:           item.part_id,
          transaction_type:  'IN' as any,
          quantity:          item.quantity,
          previous_quantity: prevQty,
          new_quantity:      newQty,
          reference_number:  po.po_number,
          notes:             `Received via PO ${po.po_number}`,
        }));
      }

      /* ── 2. Vendor ledger PURCHASE entry ── */
      const vendor = await this.vendorRepo.findOne({ where: { id: po.vendor_id } });
      if (vendor) {
        const prevBalance = Number(vendor.current_balance ?? 0);
        const newBalance  = +(prevBalance + Number(po.total_amount)).toFixed(2);

        await this.vendorLedgerRepo.save(this.vendorLedgerRepo.create({
          vendor_id:        vendor.id,
          transaction_type: 'PURCHASE' as any,
          debit:            Number(po.total_amount),
          credit:           0,
          balance:          newBalance,
          reference_number: po.po_number,
          description:      `Purchase Order ${po.po_number}`,
          notes:            po.notes ?? null,
        }));

        vendor.current_balance = newBalance;
        await this.vendorRepo.save(vendor);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const po = await this.findOne(id);
    await this.poRepo.remove(po);
  }
}

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
  Request,
} from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { RawMaterialPurchaseOrder } from '../entities/raw-material-purchase-order.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { ReceivePurchaseOrderDto } from './dto/receive-purchase-order.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('purchase-orders')
@UseGuards(JwtAuthGuard)
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  // Static routes first so they aren't parsed as ':id'
  @Get('stores')
  async findAllStores(): Promise<RawMaterialStore[]> {
    return this.purchaseOrdersService.findAllStores();
  }

  @Post('stores')
  async createStore(@Body() dto: CreateStoreDto): Promise<RawMaterialStore> {
    return this.purchaseOrdersService.createStore(dto);
  }

  @Put('stores/:id')
  async updateStore(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStoreDto,
  ): Promise<RawMaterialStore> {
    return this.purchaseOrdersService.updateStore(id, dto);
  }

  @Delete('stores/:id')
  async removeStore(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.purchaseOrdersService.removeStore(id);
    return { message: 'Store deleted successfully' };
  }

  @Get('inventory')
  async findAllInventory(): Promise<RawMaterialStoreInventory[]> {
    return this.purchaseOrdersService.findAllInventory();
  }

  @Get('stores/:storeId/inventory')
  async findStoreInventory(
    @Param('storeId', ParseIntPipe) storeId: number,
  ): Promise<RawMaterialStoreInventory[]> {
    return this.purchaseOrdersService.findStoreInventory(storeId);
  }

  @Get('inventory-ledger')
  async findInventoryLedger(): Promise<RawMaterialInventoryLedger[]> {
    return this.purchaseOrdersService.findInventoryLedger();
  }

  @Get()
  async findAll(): Promise<RawMaterialPurchaseOrder[]> {
    return this.purchaseOrdersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RawMaterialPurchaseOrder> {
    return this.purchaseOrdersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreatePurchaseOrderDto): Promise<RawMaterialPurchaseOrder> {
    return this.purchaseOrdersService.create(dto);
  }

  @Post(':id/receive')
  async receive(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReceivePurchaseOrderDto,
    @Request() req,
  ): Promise<RawMaterialPurchaseOrder> {
    return this.purchaseOrdersService.receive(id, dto, req.user.sub);
  }

  @Post(':id/cancel')
  async cancel(@Param('id', ParseIntPipe) id: number): Promise<RawMaterialPurchaseOrder> {
    return this.purchaseOrdersService.cancel(id);
  }
}

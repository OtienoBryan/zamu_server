import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { NoticesModule } from './notices/notices.module';
import { CountriesModule } from './countries/countries.module';
import { StaffModule } from './staff/staff.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BookingsModule } from './bookings/bookings.module';
import { RegionsModule } from './regions/regions.module';
import { StationsModule } from './stations/stations.module';
import { LpgLedgerModule } from './lpg-ledger/lpg-ledger.module';
import { StationTanksModule } from './station-tanks/station-tanks.module';
import { StationExpensesModule } from './station-expenses/station-expenses.module';
import { FuelPricesModule } from './fuel-prices/fuel-prices.module';
import { KeyAccountsModule } from './key-accounts/key-accounts.module';
import { KeyAccountLedgerModule } from './key-account-ledger/key-account-ledger.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';
import { ConversionsModule } from './conversions/conversions.module';
import { ConversionClientsModule } from './conversion-clients/conversion-clients.module';
import { ConversionVehiclesModule } from './conversion-vehicles/conversion-vehicles.module';
import { PartsModule } from './parts/parts.module';
import { PartCategoriesModule } from './part-categories/part-categories.module';
import { VendorsModule } from './vendors/vendors.module';
import { PartPurchaseOrdersModule } from './part-purchase-orders/part-purchase-orders.module';
import { StoresModule } from './stores/stores.module';
import { ServicesCatalogModule } from './services-catalog/services-catalog.module';
import { JobCardsModule } from './job-cards/job-cards.module';
import { VehicleInspectionsModule } from './vehicle-inspections/vehicle-inspections.module';
import { ChecklistTemplatesModule } from './checklist-templates/checklist-templates.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ShiftsModule } from './shifts/shifts.module';
import { StaffLeavesModule } from './staff-leaves/staff-leaves.module';
import { SalesPostingsModule } from './sales-postings/sales-postings.module';
import { OmcsModule } from './omcs/omcs.module';
import { FuelTypesModule } from './fuel-types/fuel-types.module';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { SparePartsModule } from './spare-parts/spare-parts.module';
import { SparePartInventoryModule } from './spare-part-inventory/spare-part-inventory.module';
import { SparePartRequestsModule } from './spare-part-requests/spare-part-requests.module';
import { MachinesModule } from './machines/machines.module';
import { MachineInventoryModule } from './machine-inventory/machine-inventory.module';
import { MachineServiceModule } from './machine-service/machine-service.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { FinancialReportsModule } from './financial-reports/financial-reports.module';
import { FinishedProductsModule } from './finished-products/finished-products.module';
import { StaffMembersModule } from './staff-members/staff-members.module';
import { StaffAttendanceModule } from './staff-attendance/staff-attendance.module';
import { StaffMemberLeavesModule } from './staff-member-leaves/staff-member-leaves.module';
import { ProductionStagesModule } from './production-stages/production-stages.module';
import { JobsModule } from './jobs/jobs.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { WorkOrderLogsModule } from './work-order-logs/work-order-logs.module';
import { WorkOrderWasteModule } from './work-order-waste/work-order-waste.module';
import { ChartOfAccountsModule } from './chart-of-accounts/chart-of-accounts.module';
import { LabourPaymentsModule } from './labour-payments/labour-payments.module';
import { ClientsModule } from './clients/clients.module';
import { PosSalesModule } from './pos-sales/pos-sales.module';
import { QuotationsModule } from './quotations/quotations.module';
import { PosSalePaymentsModule } from './pos-sale-payments/pos-sale-payments.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpensePaymentsModule } from './expense-payments/expense-payments.module';
import { FinishedProductInventoryModule } from './finished-product-inventory/finished-product-inventory.module';
import { GlobalAuthGuard } from './auth/global-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    ChatModule,
    NoticesModule,
    CountriesModule,
    StaffModule,
    ProductsModule,
    CategoriesModule,
    BookingsModule,
    RegionsModule,
    StationsModule,
    LpgLedgerModule,
    StationTanksModule,
    StationExpensesModule,
    FuelPricesModule,
    KeyAccountsModule,
    KeyAccountLedgerModule,
    VehiclesModule,
    InventoryModule,
    SalesModule,
    ConversionsModule,
    ConversionClientsModule,
    ConversionVehiclesModule,
    PartsModule,
    PartCategoriesModule,
    VendorsModule,
    PartPurchaseOrdersModule,
    StoresModule,
    ServicesCatalogModule,
    JobCardsModule,
    VehicleInspectionsModule,
    ChecklistTemplatesModule,
    AppointmentsModule,
    ShiftsModule,
    StaffLeavesModule,
    SalesPostingsModule,
    OmcsModule,
    FuelTypesModule,
    RawMaterialsModule,
    SparePartsModule,
    SparePartInventoryModule,
    MachinesModule,
    MachineInventoryModule,
    MachineServiceModule,
    SparePartRequestsModule,
    SuppliersModule,
    PurchaseOrdersModule,
    FinancialReportsModule,
    FinishedProductsModule,
    StaffMembersModule,
    StaffAttendanceModule,
    StaffMemberLeavesModule,
    ProductionStagesModule,
    JobsModule,
    WorkOrdersModule,
    WorkOrderLogsModule,
    WorkOrderWasteModule,
    ChartOfAccountsModule,
    LabourPaymentsModule,
    ClientsModule,
    PosSalesModule,
    QuotationsModule,
    PosSalePaymentsModule,
    ReceiptsModule,
    ExpensesModule,
    ExpensePaymentsModule,
    FinishedProductInventoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule {}

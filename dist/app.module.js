"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_config_1 = require("./config/database.config");
const auth_module_1 = require("./auth/auth.module");
const chat_module_1 = require("./chat/chat.module");
const notices_module_1 = require("./notices/notices.module");
const countries_module_1 = require("./countries/countries.module");
const staff_module_1 = require("./staff/staff.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const bookings_module_1 = require("./bookings/bookings.module");
const regions_module_1 = require("./regions/regions.module");
const stations_module_1 = require("./stations/stations.module");
const lpg_ledger_module_1 = require("./lpg-ledger/lpg-ledger.module");
const station_tanks_module_1 = require("./station-tanks/station-tanks.module");
const station_expenses_module_1 = require("./station-expenses/station-expenses.module");
const fuel_prices_module_1 = require("./fuel-prices/fuel-prices.module");
const key_accounts_module_1 = require("./key-accounts/key-accounts.module");
const key_account_ledger_module_1 = require("./key-account-ledger/key-account-ledger.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const inventory_module_1 = require("./inventory/inventory.module");
const sales_module_1 = require("./sales/sales.module");
const conversions_module_1 = require("./conversions/conversions.module");
const conversion_clients_module_1 = require("./conversion-clients/conversion-clients.module");
const conversion_vehicles_module_1 = require("./conversion-vehicles/conversion-vehicles.module");
const parts_module_1 = require("./parts/parts.module");
const part_categories_module_1 = require("./part-categories/part-categories.module");
const vendors_module_1 = require("./vendors/vendors.module");
const part_purchase_orders_module_1 = require("./part-purchase-orders/part-purchase-orders.module");
const stores_module_1 = require("./stores/stores.module");
const services_catalog_module_1 = require("./services-catalog/services-catalog.module");
const job_cards_module_1 = require("./job-cards/job-cards.module");
const vehicle_inspections_module_1 = require("./vehicle-inspections/vehicle-inspections.module");
const checklist_templates_module_1 = require("./checklist-templates/checklist-templates.module");
const appointments_module_1 = require("./appointments/appointments.module");
const shifts_module_1 = require("./shifts/shifts.module");
const staff_leaves_module_1 = require("./staff-leaves/staff-leaves.module");
const sales_postings_module_1 = require("./sales-postings/sales-postings.module");
const omcs_module_1 = require("./omcs/omcs.module");
const fuel_types_module_1 = require("./fuel-types/fuel-types.module");
const raw_materials_module_1 = require("./raw-materials/raw-materials.module");
const spare_parts_module_1 = require("./spare-parts/spare-parts.module");
const spare_part_inventory_module_1 = require("./spare-part-inventory/spare-part-inventory.module");
const spare_part_requests_module_1 = require("./spare-part-requests/spare-part-requests.module");
const machines_module_1 = require("./machines/machines.module");
const machine_inventory_module_1 = require("./machine-inventory/machine-inventory.module");
const machine_service_module_1 = require("./machine-service/machine-service.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const purchase_orders_module_1 = require("./purchase-orders/purchase-orders.module");
const financial_reports_module_1 = require("./financial-reports/financial-reports.module");
const finished_products_module_1 = require("./finished-products/finished-products.module");
const staff_members_module_1 = require("./staff-members/staff-members.module");
const staff_attendance_module_1 = require("./staff-attendance/staff-attendance.module");
const staff_member_leaves_module_1 = require("./staff-member-leaves/staff-member-leaves.module");
const production_stages_module_1 = require("./production-stages/production-stages.module");
const jobs_module_1 = require("./jobs/jobs.module");
const work_orders_module_1 = require("./work-orders/work-orders.module");
const work_order_logs_module_1 = require("./work-order-logs/work-order-logs.module");
const work_order_waste_module_1 = require("./work-order-waste/work-order-waste.module");
const chart_of_accounts_module_1 = require("./chart-of-accounts/chart-of-accounts.module");
const labour_payments_module_1 = require("./labour-payments/labour-payments.module");
const clients_module_1 = require("./clients/clients.module");
const pos_sales_module_1 = require("./pos-sales/pos-sales.module");
const quotations_module_1 = require("./quotations/quotations.module");
const pos_sale_payments_module_1 = require("./pos-sale-payments/pos-sale-payments.module");
const receipts_module_1 = require("./receipts/receipts.module");
const expenses_module_1 = require("./expenses/expenses.module");
const expense_payments_module_1 = require("./expense-payments/expense-payments.module");
const finished_product_inventory_module_1 = require("./finished-product-inventory/finished-product-inventory.module");
const global_auth_guard_1 = require("./auth/global-auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: database_config_1.getDatabaseConfig,
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            chat_module_1.ChatModule,
            notices_module_1.NoticesModule,
            countries_module_1.CountriesModule,
            staff_module_1.StaffModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            bookings_module_1.BookingsModule,
            regions_module_1.RegionsModule,
            stations_module_1.StationsModule,
            lpg_ledger_module_1.LpgLedgerModule,
            station_tanks_module_1.StationTanksModule,
            station_expenses_module_1.StationExpensesModule,
            fuel_prices_module_1.FuelPricesModule,
            key_accounts_module_1.KeyAccountsModule,
            key_account_ledger_module_1.KeyAccountLedgerModule,
            vehicles_module_1.VehiclesModule,
            inventory_module_1.InventoryModule,
            sales_module_1.SalesModule,
            conversions_module_1.ConversionsModule,
            conversion_clients_module_1.ConversionClientsModule,
            conversion_vehicles_module_1.ConversionVehiclesModule,
            parts_module_1.PartsModule,
            part_categories_module_1.PartCategoriesModule,
            vendors_module_1.VendorsModule,
            part_purchase_orders_module_1.PartPurchaseOrdersModule,
            stores_module_1.StoresModule,
            services_catalog_module_1.ServicesCatalogModule,
            job_cards_module_1.JobCardsModule,
            vehicle_inspections_module_1.VehicleInspectionsModule,
            checklist_templates_module_1.ChecklistTemplatesModule,
            appointments_module_1.AppointmentsModule,
            shifts_module_1.ShiftsModule,
            staff_leaves_module_1.StaffLeavesModule,
            sales_postings_module_1.SalesPostingsModule,
            omcs_module_1.OmcsModule,
            fuel_types_module_1.FuelTypesModule,
            raw_materials_module_1.RawMaterialsModule,
            spare_parts_module_1.SparePartsModule,
            spare_part_inventory_module_1.SparePartInventoryModule,
            machines_module_1.MachinesModule,
            machine_inventory_module_1.MachineInventoryModule,
            machine_service_module_1.MachineServiceModule,
            spare_part_requests_module_1.SparePartRequestsModule,
            suppliers_module_1.SuppliersModule,
            purchase_orders_module_1.PurchaseOrdersModule,
            financial_reports_module_1.FinancialReportsModule,
            finished_products_module_1.FinishedProductsModule,
            staff_members_module_1.StaffMembersModule,
            staff_attendance_module_1.StaffAttendanceModule,
            staff_member_leaves_module_1.StaffMemberLeavesModule,
            production_stages_module_1.ProductionStagesModule,
            jobs_module_1.JobsModule,
            work_orders_module_1.WorkOrdersModule,
            work_order_logs_module_1.WorkOrderLogsModule,
            work_order_waste_module_1.WorkOrderWasteModule,
            chart_of_accounts_module_1.ChartOfAccountsModule,
            labour_payments_module_1.LabourPaymentsModule,
            clients_module_1.ClientsModule,
            pos_sales_module_1.PosSalesModule,
            quotations_module_1.QuotationsModule,
            pos_sale_payments_module_1.PosSalePaymentsModule,
            receipts_module_1.ReceiptsModule,
            expenses_module_1.ExpensesModule,
            expense_payments_module_1.ExpensePaymentsModule,
            finished_product_inventory_module_1.FinishedProductInventoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: global_auth_guard_1.GlobalAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
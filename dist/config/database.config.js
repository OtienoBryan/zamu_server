"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const entities_1 = require("../entities");
const client_entity_1 = require("../entities/client.entity");
const product_entity_1 = require("../entities/product.entity");
const category_entity_1 = require("../entities/category.entity");
const aircraft_entity_1 = require("../entities/aircraft.entity");
const destination_entity_1 = require("../entities/destination.entity");
const flight_series_entity_1 = require("../entities/flight-series.entity");
const seat_reservation_entity_1 = require("../entities/seat-reservation.entity");
const passenger_entity_1 = require("../entities/passenger.entity");
const booking_entity_1 = require("../entities/booking.entity");
const booking_passenger_entity_1 = require("../entities/booking-passenger.entity");
const client_ledger_entity_1 = require("../entities/client-ledger.entity");
const sales_order_entity_1 = require("../entities/sales-order.entity");
const sales_order_item_entity_1 = require("../entities/sales-order-item.entity");
const supplier_entity_1 = require("../entities/supplier.entity");
const purchase_order_entity_1 = require("../entities/purchase-order.entity");
const purchase_order_item_entity_1 = require("../entities/purchase-order-item.entity");
const task_entity_1 = require("../entities/task.entity");
const crew_entity_1 = require("../entities/crew.entity");
const key_account_entity_1 = require("../entities/key-account.entity");
const key_account_ledger_entity_1 = require("../entities/key-account-ledger.entity");
const vehicle_entity_1 = require("../entities/vehicle.entity");
const inventory_entity_1 = require("../entities/inventory.entity");
const inventory_ledger_entity_1 = require("../entities/inventory-ledger.entity");
const sale_entity_1 = require("../entities/sale.entity");
const conversion_entity_1 = require("../entities/conversion.entity");
const conversion_client_entity_1 = require("../entities/conversion-client.entity");
const conversion_vehicle_entity_1 = require("../entities/conversion-vehicle.entity");
const part_entity_1 = require("../entities/part.entity");
const part_inventory_entity_1 = require("../entities/part-inventory.entity");
const part_category_entity_1 = require("../entities/part-category.entity");
const vendor_entity_1 = require("../entities/vendor.entity");
const vendor_ledger_entity_1 = require("../entities/vendor-ledger.entity");
const part_purchase_order_entity_1 = require("../entities/part-purchase-order.entity");
const part_purchase_order_item_entity_1 = require("../entities/part-purchase-order-item.entity");
const store_entity_1 = require("../entities/store.entity");
const service_entity_1 = require("../entities/service.entity");
const job_card_entity_1 = require("../entities/job-card.entity");
const job_card_item_entity_1 = require("../entities/job-card-item.entity");
const job_card_payment_entity_1 = require("../entities/job-card-payment.entity");
const vehicle_inspection_entity_1 = require("../entities/vehicle-inspection.entity");
const checklist_template_entity_1 = require("../entities/checklist-template.entity");
const appointment_entity_1 = require("../entities/appointment.entity");
const shift_entity_1 = require("../entities/shift.entity");
const staff_leave_entity_1 = require("../entities/staff-leave.entity");
const sales_posting_entity_1 = require("../entities/sales-posting.entity");
const station_lpg_ledger_entity_1 = require("../entities/station-lpg-ledger.entity");
const station_tank_entity_1 = require("../entities/station-tank.entity");
const station_expense_entity_1 = require("../entities/station-expense.entity");
const omc_entity_1 = require("../entities/omc.entity");
const fuel_type_entity_1 = require("../entities/fuel-type.entity");
const raw_material_entity_1 = require("../entities/raw-material.entity");
const raw_material_category_entity_1 = require("../entities/raw-material-category.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const raw_material_purchase_order_entity_1 = require("../entities/raw-material-purchase-order.entity");
const raw_material_purchase_order_item_entity_1 = require("../entities/raw-material-purchase-order-item.entity");
const raw_material_store_inventory_entity_1 = require("../entities/raw-material-store-inventory.entity");
const raw_material_inventory_ledger_entity_1 = require("../entities/raw-material-inventory-ledger.entity");
const spare_part_entity_1 = require("../entities/spare-part.entity");
const spare_part_category_entity_1 = require("../entities/spare-part-category.entity");
const spare_part_store_inventory_entity_1 = require("../entities/spare-part-store-inventory.entity");
const spare_part_inventory_ledger_entity_1 = require("../entities/spare-part-inventory-ledger.entity");
const machine_entity_1 = require("../entities/machine.entity");
const machine_category_entity_1 = require("../entities/machine-category.entity");
const machine_store_inventory_entity_1 = require("../entities/machine-store-inventory.entity");
const machine_inventory_ledger_entity_1 = require("../entities/machine-inventory-ledger.entity");
const machine_service_record_entity_1 = require("../entities/machine-service-record.entity");
const machine_service_part_entity_1 = require("../entities/machine-service-part.entity");
const machine_service_worker_entity_1 = require("../entities/machine-service-worker.entity");
const spare_part_request_entity_1 = require("../entities/spare-part-request.entity");
const spare_part_request_item_entity_1 = require("../entities/spare-part-request-item.entity");
const supplier_ledger_entity_1 = require("../entities/supplier-ledger.entity");
const account_category_entity_1 = require("../entities/account-category.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const finished_product_category_entity_1 = require("../entities/finished-product-category.entity");
const finished_product_material_entity_1 = require("../entities/finished-product-material.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const staff_attendance_entity_1 = require("../entities/staff-attendance.entity");
const staff_member_leave_entity_1 = require("../entities/staff-member-leave.entity");
const production_stage_entity_1 = require("../entities/production-stage.entity");
const job_entity_1 = require("../entities/job.entity");
const work_order_entity_1 = require("../entities/work-order.entity");
const work_order_staff_entity_1 = require("../entities/work-order-staff.entity");
const work_order_material_entity_1 = require("../entities/work-order-material.entity");
const work_order_log_entity_1 = require("../entities/work-order-log.entity");
const work_order_waste_entity_1 = require("../entities/work-order-waste.entity");
const labour_payment_entity_1 = require("../entities/labour-payment.entity");
const client_record_entity_1 = require("../entities/client-record.entity");
const pos_sale_entity_1 = require("../entities/pos-sale.entity");
const quotation_entity_1 = require("../entities/quotation.entity");
const quotation_item_entity_1 = require("../entities/quotation-item.entity");
const pos_sale_item_entity_1 = require("../entities/pos-sale-item.entity");
const pos_sale_payment_entity_1 = require("../entities/pos-sale-payment.entity");
const expense_entity_1 = require("../entities/expense.entity");
const expense_payment_entity_1 = require("../entities/expense-payment.entity");
const finished_product_store_inventory_entity_1 = require("../entities/finished-product-store-inventory.entity");
const finished_product_inventory_ledger_entity_1 = require("../entities/finished-product-inventory-ledger.entity");
const receipt_entity_1 = require("../entities/receipt.entity");
const getDatabaseConfig = (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [entities_1.Staff, entities_1.Department, entities_1.ChatRoom, entities_1.ChatMessage, entities_1.Notice, entities_1.Country, entities_1.SalesRep, entities_1.Region, entities_1.Route, entities_1.LoginHistory, entities_1.Station, entities_1.FuelPrice, client_entity_1.Client, product_entity_1.Product, category_entity_1.Category, aircraft_entity_1.Aircraft, destination_entity_1.Destination, flight_series_entity_1.FlightSeries, seat_reservation_entity_1.SeatReservation, passenger_entity_1.Passenger, booking_entity_1.Booking, booking_passenger_entity_1.BookingPassenger, client_ledger_entity_1.ClientLedger, sales_order_entity_1.SalesOrder, sales_order_item_entity_1.SalesOrderItem, supplier_entity_1.Supplier, purchase_order_entity_1.PurchaseOrder, purchase_order_item_entity_1.PurchaseOrderItem, task_entity_1.Task, crew_entity_1.Crew, key_account_entity_1.KeyAccount, key_account_ledger_entity_1.KeyAccountLedger, vehicle_entity_1.Vehicle, inventory_entity_1.Inventory, inventory_ledger_entity_1.InventoryLedger, sale_entity_1.Sale, conversion_entity_1.Conversion, conversion_client_entity_1.ConversionClient, conversion_vehicle_entity_1.ConversionVehicle, part_entity_1.Part, part_inventory_entity_1.PartInventory, part_category_entity_1.PartCategory, vendor_entity_1.Vendor, vendor_ledger_entity_1.VendorLedger, part_purchase_order_entity_1.PartPurchaseOrder, part_purchase_order_item_entity_1.PartPurchaseOrderItem, store_entity_1.Store, service_entity_1.Service, job_card_entity_1.JobCard, job_card_item_entity_1.JobCardItem, job_card_payment_entity_1.JobCardPayment, vehicle_inspection_entity_1.VehicleInspection, checklist_template_entity_1.ChecklistTemplate, appointment_entity_1.Appointment, shift_entity_1.Shift, staff_leave_entity_1.StaffLeave, sales_posting_entity_1.SalesPosting, station_lpg_ledger_entity_1.StationLpgLedger, station_tank_entity_1.StationTank, station_expense_entity_1.StationExpense, omc_entity_1.Omc, fuel_type_entity_1.FuelType, raw_material_entity_1.RawMaterial, raw_material_category_entity_1.RawMaterialCategory, raw_material_store_entity_1.RawMaterialStore, raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder, raw_material_purchase_order_item_entity_1.RawMaterialPurchaseOrderItem, raw_material_store_inventory_entity_1.RawMaterialStoreInventory, raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, spare_part_entity_1.SparePart, spare_part_category_entity_1.SparePartCategory, spare_part_store_inventory_entity_1.SparePartStoreInventory, spare_part_inventory_ledger_entity_1.SparePartInventoryLedger, spare_part_request_entity_1.SparePartRequest, spare_part_request_item_entity_1.SparePartRequestItem, supplier_ledger_entity_1.SupplierLedger, account_category_entity_1.AccountCategory, chart_of_account_entity_1.ChartOfAccount, journal_entry_entity_1.JournalEntry, journal_entry_line_entity_1.JournalEntryLine, finished_product_entity_1.FinishedProduct, finished_product_category_entity_1.FinishedProductCategory, finished_product_material_entity_1.FinishedProductMaterial, staff_member_entity_1.StaffMember, staff_attendance_entity_1.StaffAttendance, staff_member_leave_entity_1.StaffMemberLeave, production_stage_entity_1.ProductionStage, job_entity_1.Job, work_order_entity_1.WorkOrder, work_order_staff_entity_1.WorkOrderStaff, work_order_material_entity_1.WorkOrderMaterial, work_order_log_entity_1.WorkOrderLog, work_order_waste_entity_1.WorkOrderWasteEntry, labour_payment_entity_1.LabourPayment, client_record_entity_1.ClientRecord, pos_sale_entity_1.PosSale, pos_sale_item_entity_1.PosSaleItem, pos_sale_payment_entity_1.PosSalePayment, quotation_entity_1.Quotation, quotation_item_entity_1.QuotationItem, expense_entity_1.Expense, expense_payment_entity_1.ExpensePayment, finished_product_store_inventory_entity_1.FinishedProductStoreInventory, finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger, receipt_entity_1.Receipt, machine_entity_1.Machine, machine_category_entity_1.MachineCategory, machine_store_inventory_entity_1.MachineStoreInventory, machine_inventory_ledger_entity_1.MachineInventoryLedger, machine_service_record_entity_1.MachineServiceRecord, machine_service_part_entity_1.MachineServicePart, machine_service_worker_entity_1.MachineServiceWorker],
    synchronize: false,
    logging: ['error'],
    extra: {
        connectionLimit: 10,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
    },
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: false,
});
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map
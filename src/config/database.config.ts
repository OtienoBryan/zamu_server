import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Staff, Department, ChatRoom, ChatMessage, Notice, Country, SalesRep, Region, Route, LoginHistory, Station, FuelPrice } from '../entities';
import { Client } from '../entities/client.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Aircraft } from '../entities/aircraft.entity';
import { Destination } from '../entities/destination.entity';
import { FlightSeries } from '../entities/flight-series.entity';
import { SeatReservation } from '../entities/seat-reservation.entity';
import { Passenger } from '../entities/passenger.entity';
import { Booking } from '../entities/booking.entity';
import { BookingPassenger } from '../entities/booking-passenger.entity';
import { ClientLedger } from '../entities/client-ledger.entity';
import { SalesOrder } from '../entities/sales-order.entity';
import { SalesOrderItem } from '../entities/sales-order-item.entity';
import { Supplier } from '../entities/supplier.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PurchaseOrderItem } from '../entities/purchase-order-item.entity';
import { Task } from '../entities/task.entity';
import { Crew } from '../entities/crew.entity';
import { KeyAccount } from '../entities/key-account.entity';
import { KeyAccountLedger } from '../entities/key-account-ledger.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { Inventory } from '../entities/inventory.entity';
import { InventoryLedger } from '../entities/inventory-ledger.entity';
import { Sale } from '../entities/sale.entity';
import { Conversion } from '../entities/conversion.entity';
import { ConversionClient } from '../entities/conversion-client.entity';
import { ConversionVehicle } from '../entities/conversion-vehicle.entity';
import { Part } from '../entities/part.entity';
import { PartInventory } from '../entities/part-inventory.entity';
import { PartCategory } from '../entities/part-category.entity';
import { Vendor } from '../entities/vendor.entity';
import { VendorLedger } from '../entities/vendor-ledger.entity';
import { PartPurchaseOrder } from '../entities/part-purchase-order.entity';
import { PartPurchaseOrderItem } from '../entities/part-purchase-order-item.entity';
import { Store } from '../entities/store.entity';
import { Service } from '../entities/service.entity';
import { JobCard } from '../entities/job-card.entity';
import { JobCardItem } from '../entities/job-card-item.entity';
import { JobCardPayment } from '../entities/job-card-payment.entity';
import { VehicleInspection } from '../entities/vehicle-inspection.entity';
import { ChecklistTemplate } from '../entities/checklist-template.entity';
import { Appointment } from '../entities/appointment.entity';
import { Shift } from '../entities/shift.entity';
import { StaffLeave } from '../entities/staff-leave.entity';
import { SalesPosting } from '../entities/sales-posting.entity';
import { StationLpgLedger } from '../entities/station-lpg-ledger.entity';
import { StationTank } from '../entities/station-tank.entity';
import { StationExpense } from '../entities/station-expense.entity';
import { Omc } from '../entities/omc.entity';
import { FuelType } from '../entities/fuel-type.entity';
import { RawMaterial } from '../entities/raw-material.entity';
import { RawMaterialCategory } from '../entities/raw-material-category.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialPurchaseOrder } from '../entities/raw-material-purchase-order.entity';
import { RawMaterialPurchaseOrderItem } from '../entities/raw-material-purchase-order-item.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartCategory } from '../entities/spare-part-category.entity';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { Machine } from '../entities/machine.entity';
import { MachineCategory } from '../entities/machine-category.entity';
import { MachineStoreInventory } from '../entities/machine-store-inventory.entity';
import { MachineInventoryLedger } from '../entities/machine-inventory-ledger.entity';
import { MachineServiceRecord } from '../entities/machine-service-record.entity';
import { MachineServicePart } from '../entities/machine-service-part.entity';
import { MachineServiceWorker } from '../entities/machine-service-worker.entity';
import { SparePartRequest } from '../entities/spare-part-request.entity';
import { SparePartRequestItem } from '../entities/spare-part-request-item.entity';
import { SupplierLedger } from '../entities/supplier-ledger.entity';
import { AccountCategory } from '../entities/account-category.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductCategory } from '../entities/finished-product-category.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { StaffAttendance } from '../entities/staff-attendance.entity';
import { StaffMemberLeave } from '../entities/staff-member-leave.entity';
import { ProductionStage } from '../entities/production-stage.entity';
import { Job } from '../entities/job.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { WorkOrderStaff } from '../entities/work-order-staff.entity';
import { WorkOrderMaterial } from '../entities/work-order-material.entity';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { WorkOrderWasteEntry } from '../entities/work-order-waste.entity';
import { LabourPayment } from '../entities/labour-payment.entity';
import { ClientRecord } from '../entities/client-record.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { Quotation } from '../entities/quotation.entity';
import { QuotationItem } from '../entities/quotation-item.entity';
import { PosSaleItem } from '../entities/pos-sale-item.entity';
import { PosSalePayment } from '../entities/pos-sale-payment.entity';
import { Expense } from '../entities/expense.entity';
import { ExpensePayment } from '../entities/expense-payment.entity';
import { FinishedProductStoreInventory } from '../entities/finished-product-store-inventory.entity';
import { FinishedProductInventoryLedger } from '../entities/finished-product-inventory-ledger.entity';
import { Receipt } from '../entities/receipt.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
      entities: [Staff, Department, ChatRoom, ChatMessage, Notice, Country, SalesRep, Region, Route, LoginHistory, Station, FuelPrice, Client, Product, Category, Aircraft, Destination, FlightSeries, SeatReservation, Passenger, Booking, BookingPassenger, ClientLedger, SalesOrder, SalesOrderItem, Supplier, PurchaseOrder, PurchaseOrderItem, Task, Crew, KeyAccount, KeyAccountLedger, Vehicle, Inventory, InventoryLedger, Sale, Conversion, ConversionClient, ConversionVehicle, Part, PartInventory, PartCategory, Vendor, VendorLedger, PartPurchaseOrder, PartPurchaseOrderItem, Store, Service, JobCard, JobCardItem, JobCardPayment, VehicleInspection, ChecklistTemplate, Appointment, Shift, StaffLeave, SalesPosting, StationLpgLedger, StationTank, StationExpense, Omc, FuelType, RawMaterial, RawMaterialCategory, RawMaterialStore, RawMaterialPurchaseOrder, RawMaterialPurchaseOrderItem, RawMaterialStoreInventory, RawMaterialInventoryLedger, SparePart, SparePartCategory, SparePartStoreInventory, SparePartInventoryLedger, SparePartRequest, SparePartRequestItem, SupplierLedger, AccountCategory, ChartOfAccount, JournalEntry, JournalEntryLine, FinishedProduct, FinishedProductCategory, FinishedProductMaterial, StaffMember, StaffAttendance, StaffMemberLeave, ProductionStage, Job, WorkOrder, WorkOrderStaff, WorkOrderMaterial, WorkOrderLog, WorkOrderWasteEntry, LabourPayment, ClientRecord, PosSale, PosSaleItem, PosSalePayment, Quotation, QuotationItem, Expense, ExpensePayment, FinishedProductStoreInventory, FinishedProductInventoryLedger, Receipt, Machine, MachineCategory, MachineStoreInventory, MachineInventoryLedger, MachineServiceRecord, MachineServicePart, MachineServiceWorker],
  synchronize: false, // Disabled to avoid schema conflicts
  logging: ['error'], // Only log query errors — logging every query slows requests down
  extra: {
    connectionLimit: 10,
    // Keep pooled connections alive so requests don't pay TCP+TLS setup to the remote DB
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  },
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false,
});

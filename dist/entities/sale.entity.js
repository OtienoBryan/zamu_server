"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = exports.PaymentMethod = exports.ClientType = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
const key_account_entity_1 = require("./key-account.entity");
const vehicle_entity_1 = require("./vehicle.entity");
const conversion_client_entity_1 = require("./conversion-client.entity");
const conversion_vehicle_entity_1 = require("./conversion-vehicle.entity");
var ClientType;
(function (ClientType) {
    ClientType["REGULAR"] = "regular";
    ClientType["KEY_ACCOUNT"] = "key_account";
})(ClientType || (exports.ClientType = ClientType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["CARD"] = "CARD";
    PaymentMethod["MPESA"] = "MPESA";
    PaymentMethod["CREDIT"] = "CREDIT";
    PaymentMethod["OTHER"] = "other";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
let Sale = class Sale {
    id;
    stationId;
    station;
    clientType;
    keyAccountId;
    keyAccount;
    vehicleId;
    vehicle;
    conversionClientId;
    conversionClient;
    conversionVehicleId;
    conversionVehicle;
    quantity;
    unitPrice;
    totalAmount;
    paymentMethod;
    saleDate;
    referenceNumber;
    notes;
    imagePath;
    createdBy;
    createdAt;
    updatedAt;
};
exports.Sale = Sale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'station_id' }),
    __metadata("design:type", Number)
], Sale.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station),
    (0, typeorm_1.JoinColumn)({ name: 'station_id' }),
    __metadata("design:type", station_entity_1.Station)
], Sale.prototype, "station", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'client_type',
        type: 'enum',
        enum: ClientType,
    }),
    __metadata("design:type", String)
], Sale.prototype, "clientType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'key_account_id', nullable: true }),
    __metadata("design:type", Number)
], Sale.prototype, "keyAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => key_account_entity_1.KeyAccount),
    (0, typeorm_1.JoinColumn)({ name: 'key_account_id' }),
    __metadata("design:type", key_account_entity_1.KeyAccount)
], Sale.prototype, "keyAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehicle_id', nullable: true }),
    __metadata("design:type", Number)
], Sale.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle),
    (0, typeorm_1.JoinColumn)({ name: 'vehicle_id' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], Sale.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_client_id', nullable: true }),
    __metadata("design:type", Number)
], Sale.prototype, "conversionClientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_client_entity_1.ConversionClient),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_client_id' }),
    __metadata("design:type", conversion_client_entity_1.ConversionClient)
], Sale.prototype, "conversionClient", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_vehicle_id', nullable: true }),
    __metadata("design:type", Number)
], Sale.prototype, "conversionVehicleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversion_vehicle_entity_1.ConversionVehicle),
    (0, typeorm_1.JoinColumn)({ name: 'conversion_vehicle_id' }),
    __metadata("design:type", conversion_vehicle_entity_1.ConversionVehicle)
], Sale.prototype, "conversionVehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method', type: 'enum', enum: PaymentMethod, nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_date', type: 'datetime' }),
    __metadata("design:type", Date)
], Sale.prototype, "saleDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_number', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_path', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "imagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', nullable: true }),
    __metadata("design:type", Number)
], Sale.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Sale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Sale.prototype, "updatedAt", void 0);
exports.Sale = Sale = __decorate([
    (0, typeorm_1.Entity)('sales')
], Sale);
//# sourceMappingURL=sale.entity.js.map
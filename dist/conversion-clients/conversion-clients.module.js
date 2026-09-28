"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionClientsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversion_clients_service_1 = require("./conversion-clients.service");
const conversion_clients_controller_1 = require("./conversion-clients.controller");
const conversion_client_entity_1 = require("../entities/conversion-client.entity");
let ConversionClientsModule = class ConversionClientsModule {
};
exports.ConversionClientsModule = ConversionClientsModule;
exports.ConversionClientsModule = ConversionClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([conversion_client_entity_1.ConversionClient])],
        controllers: [conversion_clients_controller_1.ConversionClientsController],
        providers: [conversion_clients_service_1.ConversionClientsService],
        exports: [conversion_clients_service_1.ConversionClientsService],
    })
], ConversionClientsModule);
//# sourceMappingURL=conversion-clients.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmcsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const omcs_service_1 = require("./omcs.service");
const omcs_controller_1 = require("./omcs.controller");
const omc_entity_1 = require("../entities/omc.entity");
let OmcsModule = class OmcsModule {
};
exports.OmcsModule = OmcsModule;
exports.OmcsModule = OmcsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([omc_entity_1.Omc])],
        controllers: [omcs_controller_1.OmcsController],
        providers: [omcs_service_1.OmcsService],
        exports: [omcs_service_1.OmcsService],
    })
], OmcsModule);
//# sourceMappingURL=omcs.module.js.map
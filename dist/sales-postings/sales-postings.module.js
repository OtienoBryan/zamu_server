"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesPostingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sales_postings_service_1 = require("./sales-postings.service");
const sales_postings_controller_1 = require("./sales-postings.controller");
const sales_posting_entity_1 = require("../entities/sales-posting.entity");
let SalesPostingsModule = class SalesPostingsModule {
};
exports.SalesPostingsModule = SalesPostingsModule;
exports.SalesPostingsModule = SalesPostingsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sales_posting_entity_1.SalesPosting])],
        controllers: [sales_postings_controller_1.SalesPostingsController],
        providers: [sales_postings_service_1.SalesPostingsService],
        exports: [sales_postings_service_1.SalesPostingsService],
    })
], SalesPostingsModule);
//# sourceMappingURL=sales-postings.module.js.map
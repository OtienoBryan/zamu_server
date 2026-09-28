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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleInspectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_inspection_entity_1 = require("../entities/vehicle-inspection.entity");
const RELATIONS = ['technician', 'conversionVehicle', 'conversionClient'];
let VehicleInspectionsService = class VehicleInspectionsService {
    inspectionRepository;
    constructor(inspectionRepository) {
        this.inspectionRepository = inspectionRepository;
    }
    async findByVehicle(conversionVehicleId) {
        return this.inspectionRepository.find({
            where: { conversion_vehicle_id: conversionVehicleId },
            relations: RELATIONS,
            order: { inspection_date: 'DESC' },
        });
    }
    async findOne(id) {
        const inspection = await this.inspectionRepository.findOne({
            where: { id },
            relations: RELATIONS,
        });
        if (!inspection) {
            throw new common_1.NotFoundException(`Vehicle inspection with ID ${id} not found`);
        }
        return inspection;
    }
    async create(dto) {
        const inspection = this.inspectionRepository.create({
            conversion_vehicle_id: dto.conversion_vehicle_id,
            conversion_client_id: dto.conversion_client_id,
            assigned_staff_id: dto.assigned_staff_id,
            inspection_date: dto.inspection_date,
            status: dto.status || 'pending',
            summary: dto.summary ?? null,
            checklist: dto.checklist ?? null,
            issues_found: dto.issues_found ?? 0,
        });
        const saved = await this.inspectionRepository.save(inspection);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        const inspection = await this.findOne(id);
        Object.assign(inspection, dto);
        await this.inspectionRepository.save(inspection);
        return this.findOne(id);
    }
    async remove(id) {
        const inspection = await this.findOne(id);
        await this.inspectionRepository.remove(inspection);
    }
};
exports.VehicleInspectionsService = VehicleInspectionsService;
exports.VehicleInspectionsService = VehicleInspectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_inspection_entity_1.VehicleInspection)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehicleInspectionsService);
//# sourceMappingURL=vehicle-inspections.service.js.map
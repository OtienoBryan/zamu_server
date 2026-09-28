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
exports.ChecklistTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const checklist_template_entity_1 = require("../entities/checklist-template.entity");
let ChecklistTemplatesService = class ChecklistTemplatesService {
    templateRepository;
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    async findAll() {
        return this.templateRepository.find({ order: { updated_at: 'DESC' } });
    }
    async findOne(id) {
        const template = await this.templateRepository.findOne({ where: { id } });
        if (!template) {
            throw new common_1.NotFoundException(`Checklist template with ID ${id} not found`);
        }
        return template;
    }
    async create(dto) {
        const template = this.templateRepository.create({
            title: dto.title,
            checklist: dto.checklist ?? null,
        });
        return this.templateRepository.save(template);
    }
    async update(id, dto) {
        const template = await this.findOne(id);
        Object.assign(template, dto);
        return this.templateRepository.save(template);
    }
    async remove(id) {
        const template = await this.findOne(id);
        await this.templateRepository.remove(template);
    }
};
exports.ChecklistTemplatesService = ChecklistTemplatesService;
exports.ChecklistTemplatesService = ChecklistTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checklist_template_entity_1.ChecklistTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChecklistTemplatesService);
//# sourceMappingURL=checklist-templates.service.js.map
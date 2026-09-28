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
exports.ChecklistTemplatesController = void 0;
const common_1 = require("@nestjs/common");
const checklist_templates_service_1 = require("./checklist-templates.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_checklist_template_dto_1 = require("./dto/create-checklist-template.dto");
const update_checklist_template_dto_1 = require("./dto/update-checklist-template.dto");
let ChecklistTemplatesController = class ChecklistTemplatesController {
    checklistTemplatesService;
    constructor(checklistTemplatesService) {
        this.checklistTemplatesService = checklistTemplatesService;
    }
    async findAll() {
        return this.checklistTemplatesService.findAll();
    }
    async findOne(id) {
        return this.checklistTemplatesService.findOne(id);
    }
    async create(createDto) {
        return this.checklistTemplatesService.create(createDto);
    }
    async update(id, updateDto) {
        return this.checklistTemplatesService.update(id, updateDto);
    }
    async remove(id) {
        await this.checklistTemplatesService.remove(id);
        return { message: 'Checklist template deleted successfully' };
    }
};
exports.ChecklistTemplatesController = ChecklistTemplatesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChecklistTemplatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChecklistTemplatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checklist_template_dto_1.CreateChecklistTemplateDto]),
    __metadata("design:returntype", Promise)
], ChecklistTemplatesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_checklist_template_dto_1.UpdateChecklistTemplateDto]),
    __metadata("design:returntype", Promise)
], ChecklistTemplatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChecklistTemplatesController.prototype, "remove", null);
exports.ChecklistTemplatesController = ChecklistTemplatesController = __decorate([
    (0, common_1.Controller)('checklist-templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [checklist_templates_service_1.ChecklistTemplatesService])
], ChecklistTemplatesController);
//# sourceMappingURL=checklist-templates.controller.js.map
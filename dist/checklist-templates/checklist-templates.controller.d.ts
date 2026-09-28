import { ChecklistTemplatesService } from './checklist-templates.service';
import { ChecklistTemplate } from '../entities/checklist-template.entity';
import { CreateChecklistTemplateDto } from './dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from './dto/update-checklist-template.dto';
export declare class ChecklistTemplatesController {
    private readonly checklistTemplatesService;
    constructor(checklistTemplatesService: ChecklistTemplatesService);
    findAll(): Promise<ChecklistTemplate[]>;
    findOne(id: number): Promise<ChecklistTemplate>;
    create(createDto: CreateChecklistTemplateDto): Promise<ChecklistTemplate>;
    update(id: number, updateDto: UpdateChecklistTemplateDto): Promise<ChecklistTemplate>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

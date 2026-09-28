import { Repository } from 'typeorm';
import { ChecklistTemplate } from '../entities/checklist-template.entity';
import { CreateChecklistTemplateDto } from './dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from './dto/update-checklist-template.dto';
export declare class ChecklistTemplatesService {
    private templateRepository;
    constructor(templateRepository: Repository<ChecklistTemplate>);
    findAll(): Promise<ChecklistTemplate[]>;
    findOne(id: number): Promise<ChecklistTemplate>;
    create(dto: CreateChecklistTemplateDto): Promise<ChecklistTemplate>;
    update(id: number, dto: UpdateChecklistTemplateDto): Promise<ChecklistTemplate>;
    remove(id: number): Promise<void>;
}

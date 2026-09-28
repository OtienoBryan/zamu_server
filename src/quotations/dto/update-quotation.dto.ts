import { CreateQuotationDto } from './create-quotation.dto';

// An edit always replaces the whole quotation (client, items, tax, validity,
// notes) in one go, same as the create form — so this mirrors CreateQuotationDto
// exactly rather than making every field optional.
export class UpdateQuotationDto extends CreateQuotationDto {}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobCardDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_job_card_dto_1 = require("./create-job-card.dto");
class UpdateJobCardDto extends (0, mapped_types_1.PartialType)(create_job_card_dto_1.CreateJobCardDto) {
}
exports.UpdateJobCardDto = UpdateJobCardDto;
//# sourceMappingURL=update-job-card.dto.js.map
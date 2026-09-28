"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductionStageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_production_stage_dto_1 = require("./create-production-stage.dto");
class UpdateProductionStageDto extends (0, mapped_types_1.PartialType)(create_production_stage_dto_1.CreateProductionStageDto) {
}
exports.UpdateProductionStageDto = UpdateProductionStageDto;
//# sourceMappingURL=update-production-stage.dto.js.map
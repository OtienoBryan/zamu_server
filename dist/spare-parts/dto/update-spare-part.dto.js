"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSparePartDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_spare_part_dto_1 = require("./create-spare-part.dto");
class UpdateSparePartDto extends (0, mapped_types_1.PartialType)(create_spare_part_dto_1.CreateSparePartDto) {
}
exports.UpdateSparePartDto = UpdateSparePartDto;
//# sourceMappingURL=update-spare-part.dto.js.map
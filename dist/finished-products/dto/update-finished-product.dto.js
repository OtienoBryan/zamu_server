"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFinishedProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_finished_product_dto_1 = require("./create-finished-product.dto");
class UpdateFinishedProductDto extends (0, mapped_types_1.PartialType)(create_finished_product_dto_1.CreateFinishedProductDto) {
}
exports.UpdateFinishedProductDto = UpdateFinishedProductDto;
//# sourceMappingURL=update-finished-product.dto.js.map
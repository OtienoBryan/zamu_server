"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConversionClientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_conversion_client_dto_1 = require("./create-conversion-client.dto");
class UpdateConversionClientDto extends (0, mapped_types_1.PartialType)(create_conversion_client_dto_1.CreateConversionClientDto) {
}
exports.UpdateConversionClientDto = UpdateConversionClientDto;
//# sourceMappingURL=update-conversion-client.dto.js.map
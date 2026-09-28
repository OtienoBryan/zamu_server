"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleInspectionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vehicle_inspection_dto_1 = require("./create-vehicle-inspection.dto");
class UpdateVehicleInspectionDto extends (0, mapped_types_1.PartialType)(create_vehicle_inspection_dto_1.CreateVehicleInspectionDto) {
}
exports.UpdateVehicleInspectionDto = UpdateVehicleInspectionDto;
//# sourceMappingURL=update-vehicle-inspection.dto.js.map
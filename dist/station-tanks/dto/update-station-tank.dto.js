"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStationTankDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_station_tank_dto_1 = require("./create-station-tank.dto");
class UpdateStationTankDto extends (0, mapped_types_1.PartialType)(create_station_tank_dto_1.CreateStationTankDto) {
}
exports.UpdateStationTankDto = UpdateStationTankDto;
//# sourceMappingURL=update-station-tank.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStationExpenseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_station_expense_dto_1 = require("./create-station-expense.dto");
class UpdateStationExpenseDto extends (0, mapped_types_1.PartialType)(create_station_expense_dto_1.CreateStationExpenseDto) {
}
exports.UpdateStationExpenseDto = UpdateStationExpenseDto;
//# sourceMappingURL=update-station-expense.dto.js.map
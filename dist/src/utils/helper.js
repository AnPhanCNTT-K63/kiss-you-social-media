"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOneHourPassed = exports.compareToday = exports.resetMissionTime = exports.convertStringToObjectId = exports.removeDiacritics = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = require("dayjs");
const mongoose_1 = require("mongoose");
const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
exports.removeDiacritics = removeDiacritics;
const convertStringToObjectId = (value, isArray = false) => {
    if (!value) {
        return null;
    }
    if (isArray) {
        return value.map((val) => {
            const trimmedVal = val.trim();
            if (!mongoose_1.Types.ObjectId.isValid(trimmedVal)) {
                throw new common_1.BadGatewayException(`Invalid ObjectId: ${trimmedVal}`);
            }
            return new mongoose_1.Types.ObjectId(trimmedVal);
        });
    }
    if (!mongoose_1.Types.ObjectId.isValid(value)) {
        throw new common_1.BadGatewayException(`Invalid ObjectId: ${value}`);
    }
    return new mongoose_1.Types.ObjectId(value);
};
exports.convertStringToObjectId = convertStringToObjectId;
const resetMissionTime = () => {
    return new Date().setHours(0, 0, 0, 0);
};
exports.resetMissionTime = resetMissionTime;
const compareToday = (dateFromApi) => {
    const today = (0, dayjs_1.default)().startOf('day');
    const isSameDay = (0, dayjs_1.default)(dateFromApi).isAfter(today);
    return isSameDay;
};
exports.compareToday = compareToday;
const hasOneHourPassed = (timestamp) => {
    const now = (0, dayjs_1.default)();
    return now.isAfter((0, dayjs_1.default)(timestamp).add(1, 'hour'));
};
exports.hasOneHourPassed = hasOneHourPassed;
//# sourceMappingURL=helper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerBetweenOperator = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const handlerBetweenOperator = (search, key) => {
    const [from, to] = search[key].split(',');
    if (!from || !to) {
        throw new common_1.UnprocessableEntityException('Invalid search query value. Please provide both from and to value');
    }
    if (!isNaN(Date.parse(from)) && !isNaN(Date.parse(to))) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        if (fromDate.toDateString() === toDate.toDateString()) {
            fromDate.setHours(0, 0, 0, 0);
            toDate.setHours(23, 59, 59, 999);
        }
        return { from: fromDate, to: toDate };
    }
    const fromNumber = Number(from);
    const toNumber = Number(to);
    if (lodash_1.default.isNumber(fromNumber) &&
        !isNaN(fromNumber) &&
        lodash_1.default.isNumber(toNumber) &&
        !isNaN(toNumber)) {
        return { from: fromNumber, to: toNumber };
    }
    throw new common_1.UnprocessableEntityException('Invalid search query value. BTW just support for Date and Number');
};
exports.handlerBetweenOperator = handlerBetweenOperator;
//# sourceMappingURL=handler-between-operator.utils.js.map
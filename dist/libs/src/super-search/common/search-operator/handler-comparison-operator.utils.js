"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerComparisonOperator = void 0;
const lodash_1 = require("lodash");
const handlerComparisonOperator = (search, key) => {
    if (!isNaN(Date.parse(search[key]))) {
        return new Date(search[key]);
    }
    if (lodash_1.default.isNumber(Number(search[key])) && !isNaN(Number(search[key]))) {
        return Number(search[key]);
    }
    throw new Error('Invalid search query value. BTW just support for Date and Number');
};
exports.handlerComparisonOperator = handlerComparisonOperator;
//# sourceMappingURL=handler-comparison-operator.utils.js.map
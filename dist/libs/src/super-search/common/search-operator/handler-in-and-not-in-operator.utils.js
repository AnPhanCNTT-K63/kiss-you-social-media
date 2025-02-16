"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerInAndNotInOperator = void 0;
const lodash_1 = require("lodash");
const handlerInAndNotInOperator = (search, key) => {
    const values = search[key].split(',');
    if (values.length === 0) {
        throw new Error('Invalid search query value. Please provide at least one value');
    }
    for (let i = 0; i < values.length; i++) {
        if (Number(values[i])) {
            values[i] = Number(values[i]);
        }
        if (lodash_1.default.isString(values[i])) {
            values[i] = values[i].replace(/%3C/g, '<');
        }
    }
    return values;
};
exports.handlerInAndNotInOperator = handlerInAndNotInOperator;
//# sourceMappingURL=handler-in-and-not-in-operator.utils.js.map
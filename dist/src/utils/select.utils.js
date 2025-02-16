"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSelect = void 0;
const configSelect = (search) => {
    if (!search)
        return null;
    const keys = search.toString().split(',');
    const select = keys.reduce((acc, key) => {
        acc[key] = 1;
        return acc;
    }, {});
    return select;
};
exports.configSelect = configSelect;
//# sourceMappingURL=select.utils.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATOR = exports.SearchType = void 0;
var SearchType;
(function (SearchType) {
    SearchType["AND"] = "AND";
    SearchType["OR"] = "OR";
    SearchType["and"] = "and";
    SearchType["or"] = "or";
})(SearchType || (exports.SearchType = SearchType = {}));
var OPERATOR;
(function (OPERATOR) {
    OPERATOR["LIKE"] = "LIKE";
    OPERATOR["NOT_LIKE"] = "NOTLIKE";
    OPERATOR["IN"] = "IN";
    OPERATOR["NOT_IN"] = "NOTIN";
    OPERATOR["BETWEEN"] = "BTW";
    OPERATOR["ISNULL"] = "ISNULL";
    OPERATOR["BEFORE"] = "LT";
    OPERATOR["IS_AND_BEFORE"] = "LTEQ";
    OPERATOR["AFTER"] = "GT";
    OPERATOR["IS_AND_AFTER"] = "GTEQ";
    OPERATOR["IS"] = "IS";
    OPERATOR["NOT"] = "NOT";
    OPERATOR["IS_EMPTY"] = "ISEMPTY";
})(OPERATOR || (exports.OPERATOR = OPERATOR = {}));
//# sourceMappingURL=index.js.map
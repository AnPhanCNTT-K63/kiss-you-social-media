"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autopopulateSoftDelete = (schema) => {
    schema.pre('find', function (next) {
        this.where({ deletedAt: null });
        next();
    });
    schema.pre('findOne', function (next) {
        this.where({ deletedAt: null });
        next();
    });
    schema.pre('findOneAndUpdate', function (next) {
        this.where({ deletedAt: null });
        next();
    });
    schema.pre('countDocuments', function (next) {
        this.where({ deletedAt: null });
        next();
    });
};
exports.default = autopopulateSoftDelete;
//# sourceMappingURL=autopopulate-soft-delete.js.map
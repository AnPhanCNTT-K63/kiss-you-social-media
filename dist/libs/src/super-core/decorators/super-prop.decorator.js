"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperProp = exports.SuperPropOptions = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class SuperPropOptions extends mongoose_2.SchemaTypeOptions {
}
exports.SuperPropOptions = SuperPropOptions;
const SuperProp = (options) => {
    const { type } = options;
    if (type === mongoose_2.Types.ObjectId) {
        options.set = (value) => (value ? new mongoose_2.Types.ObjectId(value) : value);
    }
    return (0, common_1.applyDecorators)((0, mongoose_1.Prop)(options));
};
exports.SuperProp = SuperProp;
//# sourceMappingURL=super-prop.decorator.js.map
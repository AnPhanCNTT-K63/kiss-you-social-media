"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedInjectModel = void 0;
const common_1 = require("@nestjs/common");
const extend_mongoose_utils_1 = require("../common/extend-mongoose.utils");
const ExtendedInjectModel = (model, connectionName) => (0, common_1.Inject)((0, extend_mongoose_utils_1.getExtendModelToken)(model, connectionName));
exports.ExtendedInjectModel = ExtendedInjectModel;
//# sourceMappingURL=extended-mongoose.decorators.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtendModelToken = getExtendModelToken;
const mongoose_1 = require("@nestjs/mongoose");
function getExtendModelToken(model, connectionName) {
    if (connectionName === undefined) {
        return `${model}Extend_Model`;
    }
    return `${(0, mongoose_1.getConnectionToken)(connectionName)}/${model}Extend_Model`;
}
//# sourceMappingURL=extend-mongoose.utils.js.map
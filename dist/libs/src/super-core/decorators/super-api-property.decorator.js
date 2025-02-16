"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperApiProperty = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const SuperApiProperty = (options) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)(options));
};
exports.SuperApiProperty = SuperApiProperty;
//# sourceMappingURL=super-api-property.decorator.js.map
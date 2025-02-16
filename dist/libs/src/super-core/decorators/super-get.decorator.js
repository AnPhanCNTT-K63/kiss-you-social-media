"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperGet = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_settings_1 = require("../../../../src/configs/app-settings");
const SuperGet = (options) => {
    const { route } = options || {};
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiQuery)({
        name: 'locale',
        type: String,
        required: false,
        description: 'Locale of the request',
        example: app_settings_1.appSettings.mainLanguage,
    }), (0, common_1.Get)(route));
};
exports.SuperGet = SuperGet;
//# sourceMappingURL=super-get.decorator.js.map
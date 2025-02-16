"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const medias_service_1 = require("../medias.service");
const platform_express_1 = require("@nestjs/platform-express");
const app_settings_1 = require("../../../configs/app-settings");
const user_payload_model_1 = require("../../../common/models/user-payload.model");
const me_decorator_1 = require("../../../decorators/me.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../libs/src/super-authorize/guards/jwt-auth.guard");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async create(file, user) {
        const result = await this.mediaService.createFile(file, user);
        return result;
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'File upload endpoint',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 1024 * 1024 * app_settings_1.appSettings.maxFileSize.front,
        },
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_payload_model_1.UserPayload]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "create", null);
exports.MediaController = MediaController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [medias_service_1.MediaService])
], MediaController);
//# sourceMappingURL=medias.controller.js.map
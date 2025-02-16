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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const jwt_auth_guard_1 = require("../../../../libs/src/super-authorize/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_profile_dto_1 = require("../../profile/dto/create-profile.dto");
const profile_service_1 = require("../../profile/profile.service");
const me_decorator_1 = require("../../../decorators/me.decorator");
const user_payload_model_1 = require("../../../common/models/user-payload.model");
const platform_express_1 = require("@nestjs/platform-express");
const app_settings_1 = require("../../../configs/app-settings");
const add_friend_dto_1 = require("../dto/add-friend.dto");
const filter_dto_1 = require("../dto/filter.dto");
const update_account_dto_1 = require("../dto/update-account.dto");
const update_ban_dto_1 = require("../dto/update-ban.dto");
const delete_soft_dto_1 = require("../dto/delete-soft.dto");
const mongoose_1 = require("mongoose");
let UserController = class UserController {
    constructor(userService, profileService) {
        this.userService = userService;
        this.profileService = profileService;
    }
    getAll(fiter) {
        return this.userService.getAll(fiter);
    }
    whoAmI(user) {
        return this.userService.getOne({ _id: user._id });
    }
    uploadAvatar(user, avatar) {
        return this.profileService.uploadAvatar(avatar, user);
    }
    uploadCoverPhoto(user, coverPhoto) {
        this.profileService.uploadCoverPhoto(coverPhoto, user);
    }
    addFriend(friend, user) {
        return this.userService.addFriend(friend, user);
    }
    updateProfile(id, profileDto) {
        try {
            this.profileService.updateOne(id, profileDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    updateAccount(id, accountDto) {
        try {
            this.userService.updateAccount(id, accountDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    updateBan(id, flagDto) {
        try {
            this.userService.updateBan(id, flagDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    softDelete(id, flagDto) {
        try {
            this.userService.setSoftDelete(id, flagDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    updateStatus(id) {
        return this.userService.heartBeat(id);
    }
    async getRegisterStatistics(year) {
        return this.userService.getRegisterStatistics(year);
    }
    async getFriends(id) {
        return this.userService.getFriend(id);
    }
    async getNotFriends(id, fiter) {
        return this.userService.getNotFriend(id, fiter);
    }
    getOne(id) {
        return this.userService.getOne({ _id: new mongoose_1.Types.ObjectId(id) });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_dto_1.FilterDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/who-am-i'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_model_1.UserPayload]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "whoAmI", null);
__decorate([
    (0, common_1.Post)('upload-avatar'),
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
            fileSize: 1024 * 1024 * app_settings_1.appSettings.maxFileSize.admin,
        },
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_model_1.UserPayload, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Post)('upload-cover-photo'),
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
            fileSize: 1024 * 1024 * app_settings_1.appSettings.maxFileSize.admin,
        },
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_model_1.UserPayload, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadCoverPhoto", null);
__decorate([
    (0, common_1.Post)('/add-friend'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_friend_dto_1.AddFriendDto, user_payload_model_1.UserPayload]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Patch)('/update-profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_profile_dto_1.CreateProfileDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('/update-account/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.Patch)('/update-ban/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ban_dto_1.UpdateBanDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateBan", null);
__decorate([
    (0, common_1.Patch)('/soft-delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, delete_soft_dto_1.SoftDeleteDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Patch)('/ping/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('/statistics/:year'),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRegisterStatistics", null);
__decorate([
    (0, common_1.Get)('/friends/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)('/not-friends/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getNotFriends", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOne", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        profile_service_1.ProfileService])
], UserController);
//# sourceMappingURL=user.controller.js.map
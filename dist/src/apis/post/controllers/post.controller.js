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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("../post.service");
const create_post_dto_1 = require("../dto/create-post.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../libs/src/super-authorize/guards/jwt-auth.guard");
const me_decorator_1 = require("../../../decorators/me.decorator");
const user_payload_model_1 = require("../../../common/models/user-payload.model");
const platform_express_1 = require("@nestjs/platform-express");
const app_settings_1 = require("../../../configs/app-settings");
const approve_post_dto_1 = require("../dto/approve-post.dto");
const filter_dto_1 = require("../dto/filter.dto");
const delete_post_dto_1 = require("../dto/delete-post.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    createPost(user, postDto, file) {
        return this.postService.createOne(user, postDto, file || null);
    }
    getAll(filter) {
        return this.postService.getAll(filter);
    }
    setApprove(id, dto) {
        return this.postService.setApprove(id, dto);
    }
    setDelete(id, dto) {
        return this.postService.setDelete(id, dto);
    }
    getByUserId(id) {
        return this.postService.getByUserId(id);
    }
    deletePost(id) {
        return this.postService.permanentlyDelete(id);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)('create'),
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
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_model_1.UserPayload,
        create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('get-all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_dto_1.FilterDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('set-approval-post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_post_dto_1.ApprovePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "setApprove", null);
__decorate([
    (0, common_1.Patch)('set-delete-post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, delete_post_dto_1.DeletePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "setDelete", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getByUserId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePost", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map
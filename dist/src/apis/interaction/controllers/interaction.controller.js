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
exports.InteractionController = void 0;
const common_1 = require("@nestjs/common");
const create_like_dto_1 = require("../dto/create-like.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../libs/src/super-authorize/guards/jwt-auth.guard");
const me_decorator_1 = require("../../../decorators/me.decorator");
const user_payload_model_1 = require("../../../common/models/user-payload.model");
const unlike_dto_1 = require("../dto/unlike.dto");
const like_service_1 = require("../like.service");
const create_comment_dto_1 = require("../dto/create-comment.dto");
const comment_service_1 = require("../comment.service");
const reply_comment_dto_1 = require("../dto/reply-comment.dto");
const comment_response_service_1 = require("../comment-response.service");
const create_share_dto_1 = require("../dto/create-share.dto");
const share_service_1 = require("../share.service");
let InteractionController = class InteractionController {
    constructor(likeService, commentService, commentResponseService, shareService) {
        this.likeService = likeService;
        this.commentService = commentService;
        this.commentResponseService = commentResponseService;
        this.shareService = shareService;
    }
    createLike(like, user) {
        return this.likeService.create(like, user);
    }
    unlike(like, user) {
        return this.likeService.unlike(like, user);
    }
    createComment(comment, user) {
        return this.commentService.create(comment, user);
    }
    replyComment(replyDto, user) {
        return this.commentResponseService.replyComment(replyDto, user);
    }
    sharePost(shareDto, user) {
        return this.shareService.create(shareDto, user);
    }
    getCommnetCount(id) {
        return this.commentService.countComment(id);
    }
    getShareCount(id) {
        return this.shareService.count(id);
    }
    getComments(id) {
        return this.commentService.getAll(id);
    }
    getLikeRecord(id) {
        return this.likeService.getByPostId(id);
    }
};
exports.InteractionController = InteractionController;
__decorate([
    (0, common_1.Post)('/like'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_dto_1.CreateLikeDto, user_payload_model_1.UserPayload]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "createLike", null);
__decorate([
    (0, common_1.Post)('/unlike'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unlike_dto_1.UnlikeDto, user_payload_model_1.UserPayload]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "unlike", null);
__decorate([
    (0, common_1.Post)('/create-comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, user_payload_model_1.UserPayload]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "createComment", null);
__decorate([
    (0, common_1.Post)('reply-comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_comment_dto_1.ReplyCommentDto, user_payload_model_1.UserPayload]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "replyComment", null);
__decorate([
    (0, common_1.Post)('share-post'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_share_dto_1.CreateShareDto, user_payload_model_1.UserPayload]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "sharePost", null);
__decorate([
    (0, common_1.Get)('/comments-count/post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "getCommnetCount", null);
__decorate([
    (0, common_1.Get)('/shares-count/post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "getShareCount", null);
__decorate([
    (0, common_1.Get)('/comments/post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "getComments", null);
__decorate([
    (0, common_1.Get)('/like-record/post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionController.prototype, "getLikeRecord", null);
exports.InteractionController = InteractionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('interaction'),
    __metadata("design:paramtypes", [like_service_1.LikeService,
        comment_service_1.CommentService,
        comment_response_service_1.CommentResponseService,
        share_service_1.ShareService])
], InteractionController);
//# sourceMappingURL=interaction.controller.js.map
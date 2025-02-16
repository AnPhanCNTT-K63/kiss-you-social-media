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
exports.CommentResponseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_response_entity_1 = require("./entities/comment-response.entity");
const comment_service_1 = require("./comment.service");
const post_service_1 = require("../post/post.service");
let CommentResponseService = class CommentResponseService {
    constructor(responseModel, commentService, postService) {
        this.responseModel = responseModel;
        this.commentService = commentService;
        this.postService = postService;
    }
    async replyComment(replyDto, user) {
        try {
            const reply = await this.responseModel.create({
                ...replyDto,
                post: new mongoose_2.Types.ObjectId(replyDto.post),
                comment: new mongoose_2.Types.ObjectId(replyDto.comment),
                user: new mongoose_2.Types.ObjectId(user._id),
            });
            const populateReply = await reply.populate({
                path: 'user',
                populate: {
                    path: 'profile',
                    populate: {
                        path: 'avatar',
                    },
                },
            });
            await this.commentService.commentModel.updateOne({ _id: new mongoose_2.Types.ObjectId(replyDto.comment) }, { $push: { responses: reply._id } });
            await this.postService.postModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(replyDto.post) }, { $inc: { comments: 1 } });
            return populateReply;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to reply to comment');
        }
    }
};
exports.CommentResponseService = CommentResponseService;
exports.CommentResponseService = CommentResponseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_response_entity_1.CommentResponse.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        comment_service_1.CommentService,
        post_service_1.PostService])
], CommentResponseService);
//# sourceMappingURL=comment-response.service.js.map
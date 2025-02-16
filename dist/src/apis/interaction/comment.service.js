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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_entity_1 = require("./entities/comment.entity");
const post_service_1 = require("../post/post.service");
const notification_service_1 = require("../notification/notification.service");
let CommentService = class CommentService {
    constructor(commentModel, postService, notificationService) {
        this.commentModel = commentModel;
        this.postService = postService;
        this.notificationService = notificationService;
    }
    async create(commentDto, user) {
        try {
            const newCommnet = await this.commentModel.create({
                ...commentDto,
                post: new mongoose_2.Types.ObjectId(commentDto.post),
                user: new mongoose_2.Types.ObjectId(user._id),
            });
            const populatNewComment = await newCommnet.populate({
                path: 'user',
                populate: {
                    path: 'profile',
                    populate: {
                        path: 'avatar',
                    },
                },
            });
            await this.postService.postModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(commentDto.post) }, { $inc: { comments: 1 } });
            await this.notificationService.create(commentDto.notification, user._id);
            return populatNewComment;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(postId) {
        try {
            return this.commentModel
                .find({ post: new mongoose_2.Types.ObjectId(postId) })
                .populate([
                {
                    path: 'user',
                    populate: {
                        path: 'profile',
                        populate: {
                            path: 'avatar',
                        },
                    },
                },
                {
                    path: 'responses',
                    populate: {
                        path: 'user',
                        populate: {
                            path: 'profile',
                            populate: {
                                path: 'avatar',
                            },
                        },
                    },
                },
            ]);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getOne(id) {
        try {
            return this.commentModel.findOne({ _id: new mongoose_2.Types.ObjectId(id) });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async countComment(postId) {
        try {
            const comment = await this.commentModel.find({
                post: new mongoose_2.Types.ObjectId(postId),
            });
            let countResponses = 0;
            comment.map((c) => (countResponses += c.responses.length));
            return comment.length + countResponses;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        post_service_1.PostService,
        notification_service_1.NotificationService])
], CommentService);
//# sourceMappingURL=comment.service.js.map
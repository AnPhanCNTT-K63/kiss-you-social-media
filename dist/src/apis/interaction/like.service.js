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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const like_entity_1 = require("./entities/like.entity");
const mongoose_2 = require("mongoose");
const post_service_1 = require("../post/post.service");
const notification_service_1 = require("../notification/notification.service");
let LikeService = class LikeService {
    constructor(likeModel, postService, notificationService) {
        this.likeModel = likeModel;
        this.postService = postService;
        this.notificationService = notificationService;
    }
    async create(likeDto, user) {
        try {
            const likeCreated = await this.likeModel.create({
                post: new mongoose_2.Types.ObjectId(likeDto.post),
                user: user._id,
            });
            await likeCreated.save();
            const post = await this.postService.getOne(likeDto.post);
            post.likes += 1;
            await post.save();
            await this.notificationService.create(likeDto.notification, user._id);
            return likeCreated;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async unlike(likeDto, user) {
        try {
            await this.likeModel.deleteOne({
                post: new mongoose_2.Types.ObjectId(likeDto.post),
                user: new mongoose_2.Types.ObjectId(user._id),
            });
            const post = await this.postService.getOne(likeDto.post);
            post.likes -= 1;
            await post.save();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getByPostId(postId) {
        try {
            return this.likeModel.find({ post: new mongoose_2.Types.ObjectId(postId) });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(like_entity_1.Like.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        post_service_1.PostService,
        notification_service_1.NotificationService])
], LikeService);
//# sourceMappingURL=like.service.js.map
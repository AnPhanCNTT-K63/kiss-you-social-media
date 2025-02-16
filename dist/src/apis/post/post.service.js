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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_entity_1 = require("./entities/post.entity");
const medias_service_1 = require("../media/medias.service");
let PostService = class PostService {
    constructor(postModel, mediaService) {
        this.postModel = postModel;
        this.mediaService = mediaService;
    }
    async createOne(user, postDto, file) {
        try {
            let newFile = null;
            if (file) {
                newFile = await this.mediaService.createFile(file, user, 'posts');
                if (newFile instanceof common_1.BadRequestException) {
                    throw newFile;
                }
                await newFile.save();
            }
            const newPostData = {
                ...postDto,
                createdBy: user._id,
            };
            if (newFile) {
                newPostData.image = newFile._id;
            }
            const newPost = await this.postModel.create(newPostData);
            const populatedPost = await newPost.populate([
                {
                    path: 'createdBy',
                    populate: {
                        path: 'profile',
                        populate: ['avatar', 'coverPhoto'],
                    },
                },
                { path: 'image' },
            ]);
            return populatedPost;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || error);
        }
    }
    getAll(filterQuery) {
        const filter = filterQuery && Object.keys(filterQuery).length > 0 ? filterQuery : {};
        if (filterQuery.content) {
            filter.content = { $regex: filterQuery.content, $options: 'i' };
        }
        return this.postModel.find(filter).populate(this.getPopulateOptions());
    }
    getPopulateOptions() {
        return [
            {
                path: 'createdBy',
                populate: {
                    path: 'profile',
                    populate: ['avatar', 'coverPhoto'],
                },
            },
            { path: 'image' },
            {
                path: 'sharedPost',
                populate: [
                    {
                        path: 'createdBy',
                        populate: {
                            path: 'profile',
                            populate: ['avatar', 'coverPhoto'],
                        },
                    },
                    { path: 'image' },
                ],
            },
        ];
    }
    getOne(id) {
        return this.postModel.findById(new mongoose_2.Types.ObjectId(id)).populate([
            {
                path: 'createdBy',
                populate: {
                    path: 'profile',
                    populate: ['avatar', 'coverPhoto'],
                },
            },
            { path: 'image' },
            {
                path: 'sharedPost',
                populate: [
                    {
                        path: 'createdBy',
                        populate: {
                            path: 'profile',
                            populate: ['avatar', 'coverPhoto'],
                        },
                    },
                    { path: 'image' },
                ],
            },
        ]);
    }
    getByUserId(userId) {
        return this.postModel
            .find({ createdBy: new mongoose_2.Types.ObjectId(userId) })
            .populate([
            {
                path: 'createdBy',
                populate: {
                    path: 'profile',
                    populate: ['avatar', 'coverPhoto'],
                },
            },
            { path: 'image' },
            {
                path: 'sharedPost',
                populate: [
                    {
                        path: 'createdBy',
                        populate: {
                            path: 'profile',
                            populate: ['avatar', 'coverPhoto'],
                        },
                    },
                    { path: 'image' },
                ],
            },
        ]);
    }
    async setApprove(id, flagDto) {
        try {
            await this.postModel.findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), {
                isApproved: flagDto.flag === 1 ? true : false,
                status: flagDto.flag === 1 ? 'approved' : 'disApproved',
            }, { new: true });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to approve status');
        }
    }
    async setDelete(id, flagDto) {
        try {
            await this.postModel.findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), {
                isDeleted: flagDto.flag === 1 ? true : false,
            }, { new: true });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to soft delete status');
        }
    }
    async permanentlyDelete(id) {
        try {
            await this.postModel.findByIdAndDelete(new mongoose_2.Types.ObjectId(id));
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_entity_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        medias_service_1.MediaService])
], PostService);
//# sourceMappingURL=post.service.js.map
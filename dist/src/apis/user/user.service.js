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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("@nestjs/mongoose");
const profile_entity_1 = require("../profile/entities/profile.entity");
const notification_service_1 = require("../notification/notification.service");
const schedule_1 = require("@nestjs/schedule");
let UserService = class UserService {
    constructor(userModel, profileModel, notificationService) {
        this.userModel = userModel;
        this.profileModel = profileModel;
        this.notificationService = notificationService;
        this.OFFLINE_THRESHOLD = 60 * 1000;
    }
    getAll(filterQuery) {
        const filter = this.buildFilter(filterQuery);
        return this.userModel.find(filter).populate(this.getPopulateOptions());
    }
    buildFilter(filterQuery) {
        if (!filterQuery || Object.keys(filterQuery).length === 0) {
            return {};
        }
        const filter = {};
        if (filterQuery.isOnline !== undefined) {
            filter.isOnline = filterQuery.isOnline;
        }
        if (filterQuery.username) {
            filter.username = { $regex: filterQuery.username, $options: 'i' };
        }
        return filter;
    }
    getPopulateOptions() {
        return {
            path: 'profile',
            populate: ['avatar', 'coverPhoto'],
        };
    }
    getOne(filter) {
        try {
            return this.userModel.findOne(filter).populate({
                path: 'profile',
                populate: ['avatar', 'coverPhoto'],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    getMany(filter) {
        try {
            return this.userModel.findOne(filter).populate({
                path: 'profile',
                populate: ['avatar', 'coverPhoto'],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async creatOne(userDto) {
        try {
            var newUser = await this.userModel.create(userDto);
            var profile = new profile_entity_1.Profile();
            profile.user = newUser._id;
            const newProfile = await this.profileModel.create(profile);
            newUser.profile = newProfile._id;
            newProfile.save();
            newUser.save();
            return {
                message: 'Create success',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getFriend(id) {
        try {
            const user = await this.userModel.findById(new mongoose_1.Types.ObjectId(id));
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            const friends = await this.userModel
                .find({ _id: { $in: user.friends } })
                .populate({
                path: 'profile',
                populate: ['avatar', 'coverPhoto'],
            });
            return friends;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to fetch friends');
        }
    }
    async getNotFriend(id, filterQuery) {
        try {
            const filter = this.buildFilter(filterQuery);
            const user = await this.userModel.findById(new mongoose_1.Types.ObjectId(id));
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            const friends = await this.userModel
                .find({ _id: { $nin: user.friends } })
                .find(filter)
                .populate({
                path: 'profile',
                populate: ['avatar', 'coverPhoto'],
            });
            return friends;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to fetch friends');
        }
    }
    async addFriend(friend, user) {
        try {
            await this.userModel.findByIdAndUpdate(user._id, {
                $push: { friends: new mongoose_1.Types.ObjectId(friend.friendId) },
            }, { new: true });
            await this.notificationService.create(friend.notification, user._id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateAccount(id, updateDto) {
        try {
            const updateFields = {};
            for (const key in updateDto) {
                if (updateDto[key] !== '') {
                    updateFields[key] = updateDto[key];
                }
            }
            if (updateFields.password) {
                updateFields.password = await bcrypt.hash(updateFields.password, 10);
            }
            const existingUser = await this.userModel.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), { $set: updateFields }, { new: true });
            return existingUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to update account');
        }
    }
    async updateBan(id, flagDto) {
        try {
            await this.userModel.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), {
                isBanned: flagDto.flag === 1 ? true : false,
            }, { new: true });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to update ban status');
        }
    }
    async getRegisterStatistics(year) {
        try {
            const registerUsersPerMonth = await this.userModel.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(`${year}-01-01`),
                            $lt: new Date(`${year + 1}-01-01`),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $month: '$createdAt' },
                        registerCount: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        registerMonth: '$_id',
                        registerCount: 1,
                        _id: 0,
                    },
                },
                { $sort: { registerMonth: 1 } },
            ]);
            return { registerUsersPerMonth };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to get register statistics');
        }
    }
    async setSoftDelete(id, flagDto) {
        try {
            await this.userModel.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), {
                isDeleted: flagDto.flag === 1 ? true : false,
            }, { new: true });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to soft delete status');
        }
    }
    async checkOfflineUsers() {
        try {
            const thresholdTime = new Date(Date.now() - this.OFFLINE_THRESHOLD);
            await this.userModel.updateMany({ lastOnline: { $lt: thresholdTime }, isOnline: true }, { isOnline: false });
        }
        catch (error) {
            console.error('Failed to update offline users:', error);
        }
    }
    async heartBeat(id) {
        try {
            await this.userModel.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), {
                isOnline: true,
                lastOnline: new Date(),
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to update heartbeat');
        }
    }
};
exports.UserService = UserService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserService.prototype, "checkOfflineUsers", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(profile_entity_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        notification_service_1.NotificationService])
], UserService);
//# sourceMappingURL=user.service.js.map
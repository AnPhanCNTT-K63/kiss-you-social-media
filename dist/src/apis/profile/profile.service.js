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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const profile_entity_1 = require("./entities/profile.entity");
const mongoose_2 = require("mongoose");
const medias_service_1 = require("../media/medias.service");
let ProfileService = class ProfileService {
    constructor(profileModel, mediaService) {
        this.profileModel = profileModel;
        this.mediaService = mediaService;
    }
    async updateOne(userId, profileDto) {
        try {
            const updatedProfile = await this.profileModel.findOneAndUpdate({ user: new mongoose_2.Types.ObjectId(userId) }, { $set: profileDto }, { new: true });
            updatedProfile.save();
            if (!updatedProfile)
                throw new common_1.BadRequestException('Profile not found');
            return updatedProfile;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async uploadAvatar(avatar, user) {
        try {
            if (!avatar)
                return new common_1.BadRequestException('Avatar null');
            const newAvatarFile = await this.mediaService.createFile(avatar, user, 'avatars');
            if (newAvatarFile instanceof common_1.BadRequestException)
                throw newAvatarFile;
            const existingProfile = await this.profileModel.findOne({
                user: new mongoose_2.Types.ObjectId(user._id),
            });
            newAvatarFile.createdBy = user._id;
            await newAvatarFile.save();
            existingProfile.avatar = newAvatarFile._id;
            await existingProfile.save();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async uploadCoverPhoto(coverPhoto, user) {
        try {
            if (!coverPhoto)
                return new common_1.BadRequestException('Avatar null');
            const newCoverPhoto = await this.mediaService.createFile(coverPhoto, user, 'cover-photos');
            if (newCoverPhoto instanceof common_1.BadRequestException)
                throw newCoverPhoto;
            const existingProfile = await this.profileModel.findOne({
                user: new mongoose_2.Types.ObjectId(user._id),
            });
            newCoverPhoto.createdBy = user._id;
            await newCoverPhoto.save();
            existingProfile.coverPhoto = newCoverPhoto._id;
            await existingProfile.save();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_entity_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        medias_service_1.MediaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map
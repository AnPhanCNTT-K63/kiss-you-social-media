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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_settings_1 = require("../../configs/app-settings");
const s3_service_1 = require("../../packages/s3/s3.service");
const file_entity_1 = require("./entities/file.entity");
let MediaService = class MediaService {
    constructor(fileModel, s3Service) {
        this.fileModel = fileModel;
        this.s3Service = s3Service;
    }
    async createFile(file, user, folder = app_settings_1.appSettings.s3.folder) {
        const uploadedFile = await this.s3Service.uploadPublicFile(file, folder);
        if (!uploadedFile) {
            throw new common_1.BadRequestException('Can not upload image');
        }
        const { fieldName, originalname, mimetype, size } = file;
        const result = await this.fileModel.create({
            filename: fieldName,
            name: originalname,
            alt: originalname,
            mime: mimetype,
            size,
            filePath: app_settings_1.appSettings.s3.distribution + uploadedFile.key,
            folder,
            createdBy: user._id,
        });
        if (!result)
            return new common_1.BadRequestException("Can't create file");
        return result;
    }
    async deleteMedia(fileName) {
        const uploadedAvatar = await this.s3Service.deletePublicFile(fileName, 'marketplace');
        if (!uploadedAvatar)
            throw new common_1.BadRequestException('Can not delte image');
        return uploadedAvatar;
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_entity_1.File.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        s3_service_1.S3Service])
], MediaService);
//# sourceMappingURL=medias.service.js.map
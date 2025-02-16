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
exports.S3Service = exports.S3ServiceProvider = exports.S3ServiceLib = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const app_settings_1 = require("../../configs/app-settings");
exports.S3ServiceLib = 'lib:s3';
const s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: app_settings_1.appSettings.s3.accessKey,
        secretAccessKey: app_settings_1.appSettings.s3.secretKey,
    },
    region: app_settings_1.appSettings.s3.region,
});
exports.S3ServiceProvider = {
    provide: exports.S3ServiceLib,
    useValue: s3Client,
};
let S3Service = class S3Service {
    constructor(s3, httpService) {
        this.s3 = s3;
        this.httpService = httpService;
        this.logger = new common_1.Logger('S3Service');
    }
    returnKey(folder, originalname) {
        return (`${app_settings_1.appSettings.s3.bucket}/` +
            folder +
            `/${Date.now().toString()}-${originalname}`);
    }
    returnUrl(key) {
        return `https://${app_settings_1.appSettings.s3.bucket}.s3.amazonaws.com/${key}`;
    }
    async uploadPublicFile(file, folder) {
        try {
            const { buffer, originalname, mimetype } = file;
            const key = this.returnKey(folder, originalname);
            const command = new client_s3_1.PutObjectCommand({
                Bucket: `${app_settings_1.appSettings.s3.bucket}`,
                Body: buffer,
                Key: key,
                ContentType: mimetype,
            });
            await this.s3.send(command);
            return {
                key: key,
                url: this.returnUrl(key),
                mimetype: mimetype,
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deletePublicFile(fileName, folder) {
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: `${app_settings_1.appSettings.s3.bucket}/` + folder,
                Key: fileName,
            });
            const deleteResult = await this.s3.send(command);
            return deleteResult;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async uploadFileByUrl(url, folder, fileName) {
        try {
            const response = await this.httpService.axiosRef.get(url, {
                responseType: 'arraybuffer',
            });
            const key = this.returnKey(folder, fileName);
            const buffer = Buffer.from(response.data, 'binary');
            const mimetype = response.headers['content-type'];
            const command = new client_s3_1.PutObjectCommand({
                Bucket: `${app_settings_1.appSettings.s3.bucket}/` + folder,
                Body: buffer,
                Key: key,
                ContentType: mimetype,
            });
            await this.s3.send(command);
            return {
                key: key,
                url: this.returnUrl(key),
                mimetype: mimetype,
            };
        }
        catch (error) {
            return {
                key: '',
                url: '',
                mimetype: '',
            };
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exports.S3ServiceLib)),
    __metadata("design:paramtypes", [client_s3_1.S3Client,
        axios_1.HttpService])
], S3Service);
//# sourceMappingURL=s3.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const platform_express_1 = require("@nestjs/platform-express");
const app_settings_1 = require("../configs/app-settings");
let UploadFileInterceptor = class UploadFileInterceptor {
    intercept(context, next) {
        return new rxjs_1.Observable((observer) => {
            const multerInterceptor = new ((0, platform_express_1.FileInterceptor)('file', {
                limits: {
                    fileSize: 1024 * 1024 * app_settings_1.appSettings.maxFileSize.front,
                },
                fileFilter: (req, file, callback) => {
                    if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
                        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
                    }
                    callback(null, true);
                },
            }))();
            multerInterceptor.intercept(context, {
                handle: () => {
                    observer.next();
                    observer.complete();
                    return next.handle();
                },
            });
        });
    }
};
exports.UploadFileInterceptor = UploadFileInterceptor;
exports.UploadFileInterceptor = UploadFileInterceptor = __decorate([
    (0, common_1.Injectable)()
], UploadFileInterceptor);
//# sourceMappingURL=upload-image.interceptor.js.map
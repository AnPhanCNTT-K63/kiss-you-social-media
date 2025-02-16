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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notification_entity_1 = require("./entities/notification.entity");
const mongoose_2 = require("mongoose");
let NotificationService = class NotificationService {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async create(notificationDto, senderId) {
        try {
            await this.notificationModel.create({
                type: notificationDto.type,
                receiver: new mongoose_2.Types.ObjectId(notificationDto.receiver),
                sender: senderId,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getALl(userId) {
        try {
            return this.notificationModel
                .find({
                receiver: new mongoose_2.Types.ObjectId(userId),
            })
                .populate({
                path: 'sender',
                populate: {
                    path: 'profile',
                    populate: {
                        path: 'avatar',
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_entity_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationService);
//# sourceMappingURL=notification.service.js.map
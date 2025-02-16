import { Notification } from './entities/notification.entity';
import { Model, Types } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    readonly notificationModel: Model<Notification>;
    constructor(notificationModel: Model<Notification>);
    create(notificationDto: CreateNotificationDto, senderId: Types.ObjectId): Promise<void>;
    getALl(userId: string): Promise<(import("mongoose").Document<unknown, {}, Notification> & Notification & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}

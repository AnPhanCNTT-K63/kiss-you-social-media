import { NotificationService } from '../notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getAll(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/notification.entity").Notification> & import("../entities/notification.entity").Notification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}

import { Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export declare class Notification extends AggregateRoot {
    type: string;
    receiver: Types.ObjectId;
    sender: Types.ObjectId;
}
export declare const NotificationSchema: import("mongoose").Schema<Notification, import("mongoose").Model<Notification, any, any, any, import("mongoose").Document<unknown, any, Notification> & Notification & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Notification>> & import("mongoose").FlatRecord<Notification> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

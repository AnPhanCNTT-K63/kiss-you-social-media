import { Types } from 'mongoose';
export declare class Message {
    text: string;
    sender: Types.ObjectId;
    conversation: Types.ObjectId;
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, import("mongoose").Document<unknown, any, Message> & Message & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Message>> & import("mongoose").FlatRecord<Message> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

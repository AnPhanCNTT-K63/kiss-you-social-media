import { Model, Types } from 'mongoose';
import { Message } from './entites/message';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessageService {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    createOne(dto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getByConvId(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, Message, "find", {}>;
}

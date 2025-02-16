import { Conversation } from './entities/conversation';
import { Model } from 'mongoose';
import { CreateConversationDto } from './dto/create-conversation.dto';
export declare class ConversationService {
    private readonly conversationModel;
    constructor(conversationModel: Model<Conversation>);
    getAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Conversation> & Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Conversation> & Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Conversation, "find", {}>;
    createOne(dto: CreateConversationDto): Promise<void>;
    getByUserId(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Conversation> & Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Conversation> & Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Conversation, "find", {}>;
}

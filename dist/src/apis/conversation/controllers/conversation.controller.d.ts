import { ConversationService } from '../conversation.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';
export declare class ConversationController {
    private conversationService;
    constructor(conversationService: ConversationService);
    getALl(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../entities/conversation").Conversation> & import("../entities/conversation").Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../entities/conversation").Conversation> & import("../entities/conversation").Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../entities/conversation").Conversation, "find", {}>;
    getOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../entities/conversation").Conversation> & import("../entities/conversation").Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../entities/conversation").Conversation> & import("../entities/conversation").Conversation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../entities/conversation").Conversation, "find", {}>;
    createOne(dto: CreateConversationDto): Promise<void>;
}

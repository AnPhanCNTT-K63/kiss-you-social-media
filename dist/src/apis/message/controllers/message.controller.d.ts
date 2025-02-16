import { MessageService } from '../message.service';
import { CreateMessageDto } from '../dto/create-message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    createMessage(dto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, import("../entites/message").Message> & import("../entites/message").Message & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getByConversation(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../entites/message").Message> & import("../entites/message").Message & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../entites/message").Message> & import("../entites/message").Message & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../entites/message").Message, "find", {}>;
}

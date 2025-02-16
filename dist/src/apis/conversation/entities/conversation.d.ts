export declare class Conversation {
    members: Array<string>;
}
export declare const ConversationSchema: import("mongoose").Schema<Conversation, import("mongoose").Model<Conversation, any, any, any, import("mongoose").Document<unknown, any, Conversation> & Conversation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Conversation, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Conversation>> & import("mongoose").FlatRecord<Conversation> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

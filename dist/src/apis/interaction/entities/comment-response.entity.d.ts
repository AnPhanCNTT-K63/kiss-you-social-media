import { Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export declare class CommentResponse extends AggregateRoot {
    content: string;
    comment: Types.ObjectId;
    post: Types.ObjectId;
    user: Types.ObjectId;
}
export declare const CommentResponseSchema: import("mongoose").Schema<CommentResponse, import("mongoose").Model<CommentResponse, any, any, any, import("mongoose").Document<unknown, any, CommentResponse> & CommentResponse & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CommentResponse, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CommentResponse>> & import("mongoose").FlatRecord<CommentResponse> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

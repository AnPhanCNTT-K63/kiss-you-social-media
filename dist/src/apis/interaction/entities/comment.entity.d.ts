import { Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export declare class Comment extends AggregateRoot {
    content: string;
    likes: number;
    user: Types.ObjectId;
    responses: Types.ObjectId[];
    post: Types.ObjectId;
}
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, import("mongoose").Document<unknown, any, Comment> & Comment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Comment>> & import("mongoose").FlatRecord<Comment> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

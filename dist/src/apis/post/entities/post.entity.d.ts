import { Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export declare class Post extends AggregateRoot {
    content: string;
    isApproved: boolean;
    isDeleted: boolean;
    likes: number;
    comments: number;
    shares: number;
    status: string;
    image: Types.ObjectId;
    sharedPost: Types.ObjectId;
    createdBy: Types.ObjectId;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, import("mongoose").Document<unknown, any, Post> & Post & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Post>> & import("mongoose").FlatRecord<Post> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

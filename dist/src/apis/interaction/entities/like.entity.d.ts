import { Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export declare class Like extends AggregateRoot {
    post: Types.ObjectId;
    user: Types.ObjectId;
}
export declare const LikeSchema: import("mongoose").Schema<Like, import("mongoose").Model<Like, any, any, any, import("mongoose").Document<unknown, any, Like> & Like & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Like, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Like>> & import("mongoose").FlatRecord<Like> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

import { Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export declare class Share extends AggregateRoot {
    post: Types.ObjectId;
    user: Types.ObjectId;
}
export declare const ShareSchema: import("mongoose").Schema<Share, import("mongoose").Model<Share, any, any, any, import("mongoose").Document<unknown, any, Share> & Share & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Share, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Share>> & import("mongoose").FlatRecord<Share> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

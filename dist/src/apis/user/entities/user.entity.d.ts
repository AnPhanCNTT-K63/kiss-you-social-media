import { HydratedDocument, Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export type UserDocument = HydratedDocument<User>;
export declare class User extends AggregateRoot {
    username: string;
    email: string;
    password: string;
    role: string;
    isOnline: boolean;
    isBanned: boolean;
    isDeleted: boolean;
    lastOnline: Date;
    friends: Types.ObjectId[];
    profile: Types.ObjectId;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

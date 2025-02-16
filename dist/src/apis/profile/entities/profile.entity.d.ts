import { Types } from 'mongoose';
export declare class Profile {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    aboutMe: string;
    phone: string;
    birthday: Date;
    country: string;
    coverPhoto: Types.ObjectId;
    avatar: Types.ObjectId;
    user: Types.ObjectId;
}
export declare const ProfileSchema: import("mongoose").Schema<Profile, import("mongoose").Model<Profile, any, any, any, import("mongoose").Document<unknown, any, Profile> & Profile & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Profile, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Profile>> & import("mongoose").FlatRecord<Profile> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

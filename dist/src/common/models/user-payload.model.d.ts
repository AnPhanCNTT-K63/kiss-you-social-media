import { Types } from 'mongoose';
export declare class UserPayload {
    _id: Types.ObjectId;
    role: string;
    email: string;
    username: string;
}

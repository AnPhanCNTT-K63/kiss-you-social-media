import { Types } from 'mongoose';
export declare class CreateMessageDto {
    text: string;
    sender: Types.ObjectId;
    conversation: Types.ObjectId;
}

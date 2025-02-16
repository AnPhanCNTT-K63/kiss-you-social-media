import { Types } from 'mongoose';
export declare class ExcludeDto {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    isDeleted: boolean;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    deletedBy: Types.ObjectId;
}

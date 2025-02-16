import { Types, Document } from 'mongoose';
export declare abstract class AggregateRoot extends Document<Types.ObjectId> {
    updatedBy: Types.ObjectId;
    deletedBy: Types.ObjectId;
}

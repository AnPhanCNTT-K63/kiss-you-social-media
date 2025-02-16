import { Document, Model, Types } from 'mongoose';
export declare class BaseService<T extends Document> {
    readonly model: Model<T>;
    constructor(model: Model<T>);
    getAll(options?: any): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & import("mongoose").Default__v<import("mongoose").Require_id<T>>>[]>;
    createOne(payload: any): Promise<any>;
    getOne(options?: any): Promise<any>;
    getById(_id: Types.ObjectId): Promise<any>;
}

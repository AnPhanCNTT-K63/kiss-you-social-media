import { Types } from 'mongoose';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
export declare class File extends AggregateRoot {
    filePath: string;
    name: string;
    filename: string;
    folder: string;
    note: string;
    mime: string;
    size: number;
    alt: string;
    createdBy: Types.ObjectId;
}
export declare const FileSchema: import("mongoose").Schema<File, import("mongoose").Model<File, any, any, any, import("mongoose").Document<unknown, any, File> & File & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, File, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<File>> & import("mongoose").FlatRecord<File> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

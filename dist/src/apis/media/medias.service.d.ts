import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserPayload } from 'src/common/models/user-payload.model';
import { IUploadedMulterFile, S3Service } from 'src/packages/s3/s3.service';
import { File } from './entities/file.entity';
export declare class MediaService {
    private readonly fileModel;
    private readonly s3Service;
    constructor(fileModel: Model<File>, s3Service: S3Service);
    createFile(file: IUploadedMulterFile, user: UserPayload, folder?: string): Promise<BadRequestException | (import("mongoose").Document<unknown, {}, File> & File & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })>;
    deleteMedia(fileName: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
}

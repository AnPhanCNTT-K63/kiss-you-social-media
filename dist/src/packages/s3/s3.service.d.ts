import { HttpService } from '@nestjs/axios';
import { Provider } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
export declare const S3ServiceLib = "lib:s3";
export interface IUploadedMulterFile {
    fieldName: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
export declare const S3ServiceProvider: Provider<S3Client>;
export declare class S3Service {
    private readonly s3;
    private readonly httpService;
    private readonly logger;
    constructor(s3: S3Client, httpService: HttpService);
    private returnKey;
    private returnUrl;
    uploadPublicFile(file: IUploadedMulterFile, folder: string): Promise<{
        key: string;
        url: string;
        mimetype: string;
    }>;
    deletePublicFile(fileName: string, folder: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
    uploadFileByUrl(url: string, folder: string, fileName: string): Promise<{
        key: string;
        url: string;
        mimetype: any;
    }>;
}

import { BadRequestException } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { Model, Types } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/medias.service';
export declare class ProfileService {
    private readonly profileModel;
    private readonly mediaService;
    constructor(profileModel: Model<Profile>, mediaService: MediaService);
    updateOne(userId: string, profileDto: Partial<CreateProfileDto>): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    uploadAvatar(avatar: IUploadedMulterFile, user: UserPayload): Promise<BadRequestException>;
    uploadCoverPhoto(coverPhoto: IUploadedMulterFile, user: UserPayload): Promise<BadRequestException>;
}

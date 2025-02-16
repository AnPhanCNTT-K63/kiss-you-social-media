import { MediaService } from '../medias.service';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { UserPayload } from 'src/common/models/user-payload.model';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    create(file: IUploadedMulterFile, user: UserPayload): Promise<import("@nestjs/common").BadRequestException | (import("mongoose").Document<unknown, {}, import("../entities/file.entity").File> & import("../entities/file.entity").File & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })>;
}

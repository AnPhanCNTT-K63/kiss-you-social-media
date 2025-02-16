import { PostService } from '../post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { Post as PostEntity } from '../entities/post.entity';
import { ApprovePostDto } from '../dto/approve-post.dto';
import { FilterDto } from '../dto/filter.dto';
import { DeletePostDto } from '../dto/delete-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(user: UserPayload, postDto: CreatePostDto, file?: IUploadedMulterFile): Promise<Omit<import("mongoose").Document<unknown, {}, PostEntity> & PostEntity & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    getAll(filter: FilterDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, PostEntity> & PostEntity & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, PostEntity> & PostEntity & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, PostEntity, "find", {}>;
    setApprove(id: string, dto: ApprovePostDto): Promise<void>;
    setDelete(id: string, dto: DeletePostDto): Promise<void>;
    getByUserId(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, PostEntity> & PostEntity & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, PostEntity> & PostEntity & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, PostEntity, "find", {}>;
    deletePost(id: string): Promise<void>;
}

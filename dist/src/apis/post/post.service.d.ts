import { Model, Types } from 'mongoose';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/medias.service';
import { ApprovePostDto } from './dto/approve-post.dto';
import { FilterDto } from './dto/filter.dto';
import { DeletePostDto } from './dto/delete-post.dto';
export declare class PostService {
    readonly postModel: Model<Post>;
    private readonly mediaService;
    constructor(postModel: Model<Post>, mediaService: MediaService);
    createOne(user: any, postDto: CreatePostDto, file: IUploadedMulterFile | null): Promise<Omit<import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    getAll(filterQuery?: FilterDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Post, "find", {}>;
    private getPopulateOptions;
    getOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Post, "findOne", {}>;
    getByUserId(userId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Post, "find", {}>;
    setApprove(id: string, flagDto: ApprovePostDto): Promise<void>;
    setDelete(id: string, flagDto: DeletePostDto): Promise<void>;
    permanentlyDelete(id: string): Promise<void>;
}

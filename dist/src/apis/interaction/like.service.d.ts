import { Like } from './entities/like.entity';
import { Model, Types } from 'mongoose';
import { PostService } from '../post/post.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { UnlikeDto } from './dto/unlike.dto';
import { NotificationService } from '../notification/notification.service';
export declare class LikeService {
    private readonly likeModel;
    private readonly postService;
    private readonly notificationService;
    constructor(likeModel: Model<Like>, postService: PostService, notificationService: NotificationService);
    create(likeDto: CreateLikeDto, user: UserPayload): Promise<import("mongoose").Document<unknown, {}, Like> & Like & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    unlike(likeDto: UnlikeDto, user: UserPayload): Promise<void>;
    getByPostId(postId: string): Promise<(import("mongoose").Document<unknown, {}, Like> & Like & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}

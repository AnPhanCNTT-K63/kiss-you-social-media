import { Model, Types } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { Comment } from './entities/comment.entity';
import { PostService } from '../post/post.service';
import { NotificationService } from '../notification/notification.service';
export declare class CommentService {
    readonly commentModel: Model<Comment>;
    private readonly postService;
    private readonly notificationService;
    constructor(commentModel: Model<Comment>, postService: PostService, notificationService: NotificationService);
    create(commentDto: CreateCommentDto, user: UserPayload): Promise<Omit<import("mongoose").Document<unknown, {}, Comment> & Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    getAll(postId: string): Promise<(import("mongoose").Document<unknown, {}, Comment> & Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, Comment> & Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    countComment(postId: string): Promise<number>;
}

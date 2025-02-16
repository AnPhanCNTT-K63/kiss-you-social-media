import { CreateLikeDto } from '../dto/create-like.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { UnlikeDto } from '../dto/unlike.dto';
import { LikeService } from '../like.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../comment.service';
import { ReplyCommentDto } from '../dto/reply-comment.dto';
import { CommentResponseService } from '../comment-response.service';
import { CreateShareDto } from '../dto/create-share.dto';
import { ShareService } from '../share.service';
export declare class InteractionController {
    private readonly likeService;
    private readonly commentService;
    private readonly commentResponseService;
    private readonly shareService;
    constructor(likeService: LikeService, commentService: CommentService, commentResponseService: CommentResponseService, shareService: ShareService);
    createLike(like: CreateLikeDto, user: UserPayload): Promise<import("mongoose").Document<unknown, {}, import("../entities/like.entity").Like> & import("../entities/like.entity").Like & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    unlike(like: UnlikeDto, user: UserPayload): Promise<void>;
    createComment(comment: CreateCommentDto, user: UserPayload): Promise<Omit<import("mongoose").Document<unknown, {}, import("../entities/comment.entity").Comment> & import("../entities/comment.entity").Comment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    replyComment(replyDto: ReplyCommentDto, user: UserPayload): Promise<Omit<import("mongoose").Document<unknown, {}, import("../entities/comment-response.entity").CommentResponse> & import("../entities/comment-response.entity").CommentResponse & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    sharePost(shareDto: CreateShareDto, user: UserPayload): Promise<void>;
    getCommnetCount(id: string): Promise<number>;
    getShareCount(id: string): Promise<number>;
    getComments(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/comment.entity").Comment> & import("../entities/comment.entity").Comment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getLikeRecord(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/like.entity").Like> & import("../entities/like.entity").Like & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}

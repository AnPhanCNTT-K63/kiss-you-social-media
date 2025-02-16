import { Model, Types } from 'mongoose';
import { CommentResponse } from './entities/comment-response.entity';
import { ReplyCommentDto } from './dto/reply-comment.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { CommentService } from './comment.service';
import { PostService } from '../post/post.service';
export declare class CommentResponseService {
    private readonly responseModel;
    private readonly commentService;
    private readonly postService;
    constructor(responseModel: Model<CommentResponse>, commentService: CommentService, postService: PostService);
    replyComment(replyDto: ReplyCommentDto, user: UserPayload): Promise<Omit<import("mongoose").Document<unknown, {}, CommentResponse> & CommentResponse & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommentResponse } from './entities/comment-response.entity';
import { ReplyCommentDto } from './dto/reply-comment.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { CommentService } from './comment.service';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentResponseService {
  constructor(
    @InjectModel(CommentResponse.name)
    private readonly responseModel: Model<CommentResponse>,
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  async replyComment(replyDto: ReplyCommentDto, user: UserPayload) {
    try {
      const reply = await this.responseModel.create({
        ...replyDto,
        post: new Types.ObjectId(replyDto.post),
        comment: new Types.ObjectId(replyDto.comment),
        user: new Types.ObjectId(user._id),
      });

      const populateReply = await reply.populate({
        path: 'user',
        populate: {
          path: 'profile',
          populate: {
            path: 'avatar',
          },
        },
      });

      await this.commentService.commentModel.updateOne(
        { _id: new Types.ObjectId(replyDto.comment) },
        { $push: { responses: reply._id } },
      );

      await this.postService.postModel.findOneAndUpdate(
        { _id: new Types.ObjectId(replyDto.post) },
        { $inc: { comments: 1 } },
      );

      return populateReply;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to reply to comment',
      );
    }
  }
}

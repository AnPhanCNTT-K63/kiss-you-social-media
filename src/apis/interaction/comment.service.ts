import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { Comment } from './entities/comment.entity';
import { PostService } from '../post/post.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    public readonly commentModel: Model<Comment>,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(commentDto: CreateCommentDto, user: UserPayload) {
    try {
      const newCommnet = await this.commentModel.create({
        ...commentDto,
        post: new Types.ObjectId(commentDto.post),
        user: new Types.ObjectId(user._id),
      });

      const populatNewComment = await newCommnet.populate({
        path: 'user',
        populate: {
          path: 'profile',
          populate: {
            path: 'avatar',
          },
        },
      });

      await this.postService.postModel.findOneAndUpdate(
        { _id: new Types.ObjectId(commentDto.post) },
        { $inc: { comments: 1 } },
      );

      await this.notificationService.create(commentDto.notification, user._id);

      return populatNewComment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAll(postId: string) {
    try {
      return this.commentModel
        .find({ post: new Types.ObjectId(postId) })
        .populate([
          {
            path: 'user',
            populate: {
              path: 'profile',
              populate: {
                path: 'avatar',
              },
            },
          },
          {
            path: 'responses',
            populate: {
              path: 'user',
              populate: {
                path: 'profile',
                populate: {
                  path: 'avatar',
                },
              },
            },
          },
        ]);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getOne(id: string) {
    try {
      return this.commentModel.findOne({ _id: new Types.ObjectId(id) });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async countComment(postId: string) {
    try {
      const comment = await this.commentModel.find({
        post: new Types.ObjectId(postId),
      });
      let countResponses = 0;
      comment.map((c) => (countResponses += c.responses.length));
      return comment.length + countResponses;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

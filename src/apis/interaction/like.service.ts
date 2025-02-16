import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './entities/like.entity';
import { Model, Types } from 'mongoose';
import { PostService } from '../post/post.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { UnlikeDto } from './dto/unlike.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name)
    private readonly likeModel: Model<Like>,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(likeDto: CreateLikeDto, user: UserPayload) {
    try {
      const likeCreated = await this.likeModel.create({
        post: new Types.ObjectId(likeDto.post),
        user: user._id,
      });

      await likeCreated.save();

      const post = await this.postService.getOne(likeDto.post);
      post.likes += 1;

      await post.save();

      await this.notificationService.create(likeDto.notification, user._id);

      return likeCreated;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async unlike(likeDto: UnlikeDto, user: UserPayload) {
    try {
      await this.likeModel.deleteOne({
        post: new Types.ObjectId(likeDto.post),
        user: new Types.ObjectId(user._id),
      });

      const post = await this.postService.getOne(likeDto.post);
      post.likes -= 1;

      await post.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getByPostId(postId: string) {
    try {
      return this.likeModel.find({ post: new Types.ObjectId(postId) });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Share } from './entities/share.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShareDto } from './dto/create-share.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { PostService } from '../post/post.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(Share.name)
    private readonly shareModel: Model<Share>,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(shareDto: CreateShareDto, user: UserPayload) {
    try {
      await this.shareModel.create({
        post: new Types.ObjectId(shareDto.post),
        user: user._id,
      });

      const existingPost = await this.postService.postModel.findOne({
        _id: shareDto.post,
      });

      existingPost.shares += 1;
      await existingPost.save();

      await this.postService.postModel.create({
        createdBy: user._id,
        content: shareDto.content,
        sharedPost: existingPost._id,
        isApproved: true,
      });

      await this.notificationService.create(shareDto.notification, user._id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async count(postId: string) {
    try {
      return (await this.shareModel.find({ post: new Types.ObjectId(postId) }))
        .length;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

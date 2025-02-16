import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './entities/like.entity';
import { InteractionController } from './controllers/interaction.controller';
import { PostModule } from '../post/post.module';
import { LikeService } from './like.service';
import { Comment, CommentSchema } from './entities/comment.entity';
import {
  CommentResponse,
  CommentResponseSchema,
} from './entities/comment-response.entity';
import { CommentService } from './comment.service';
import { CommentResponseService } from './comment-response.service';
import { Share, ShareSchema } from './entities/share.entity';
import { ShareService } from './share.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: CommentResponse.name, schema: CommentResponseSchema },
      { name: Share.name, schema: ShareSchema },
    ]),
    PostModule,
    NotificationModule,
  ],
  controllers: [InteractionController],
  providers: [
    LikeService,
    CommentService,
    CommentResponseService,
    ShareService,
  ],
  exports: [LikeService, CommentService, CommentResponseService, ShareService],
})
export class InteractionModule {}

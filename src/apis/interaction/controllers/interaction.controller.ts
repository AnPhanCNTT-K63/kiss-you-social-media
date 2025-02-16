import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateLikeDto } from '../dto/create-like.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@libs/super-authorize/guards/jwt-auth.guard';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/common/models/user-payload.model';
import { UnlikeDto } from '../dto/unlike.dto';
import { LikeService } from '../like.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../comment.service';
import { ReplyCommentDto } from '../dto/reply-comment.dto';
import { CommentResponseService } from '../comment-response.service';
import { CreateShareDto } from '../dto/create-share.dto';
import { ShareService } from '../share.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('interaction')
export class InteractionController {
  constructor(
    private readonly likeService: LikeService,
    private readonly commentService: CommentService,
    private readonly commentResponseService: CommentResponseService,
    private readonly shareService: ShareService,
  ) {}
  @Post('/like')
  createLike(@Body() like: CreateLikeDto, @Me() user: UserPayload) {
    return this.likeService.create(like, user);
  }

  @Post('/unlike')
  unlike(@Body() like: UnlikeDto, @Me() user: UserPayload) {
    return this.likeService.unlike(like, user);
  }

  @Post('/create-comment')
  createComment(@Body() comment: CreateCommentDto, @Me() user: UserPayload) {
    return this.commentService.create(comment, user);
  }

  @Post('reply-comment')
  replyComment(@Body() replyDto: ReplyCommentDto, @Me() user: UserPayload) {
    return this.commentResponseService.replyComment(replyDto, user);
  }

  @Post('share-post')
  sharePost(@Body() shareDto: CreateShareDto, @Me() user: UserPayload) {
    return this.shareService.create(shareDto, user);
  }

  @Get('/comments-count/post/:id')
  getCommnetCount(@Param('id') id: string) {
    return this.commentService.countComment(id);
  }

  @Get('/shares-count/post/:id')
  getShareCount(@Param('id') id: string) {
    return this.shareService.count(id);
  }

  @Get('/comments/post/:id')
  getComments(@Param('id') id: string) {
    return this.commentService.getAll(id);
  }

  @Get('/like-record/post/:id')
  getLikeRecord(@Param('id') id: string) {
    return this.likeService.getByPostId(id);
  }
}

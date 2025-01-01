import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from '../post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@libs/super-authorize/guards/jwt-auth.guard';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/common/models/user-payload.model';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { appSettings } from 'src/configs/app-settings';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * appSettings.maxFileSize.front,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  createPost(
    @Me() user: UserPayload,
    @Body() postDto: CreatePostDto,
    @UploadedFile() file?: IUploadedMulterFile,
  ) {
    return this.postService.createOne(user, postDto, file || null);
  }

  @Get('/get-all')
  getAll() {
    return this.postService.getAll();
  }
}

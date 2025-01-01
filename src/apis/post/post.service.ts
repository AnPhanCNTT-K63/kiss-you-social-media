import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/medias.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly mediaService: MediaService,
  ) {}

  async createOne(
    user: any,
    postDto: CreatePostDto,
    file: IUploadedMulterFile | null,
  ) {
    try {
      let newFile = null;

      if (file) {
        newFile = await this.mediaService.createFile(file, user, 'posts');

        if (newFile instanceof BadRequestException) {
          throw newFile;
        }

        await newFile.save();
      }

      const newPostData: any = {
        ...postDto,
        createdBy: user._id,
      };

      if (newFile) {
        newPostData.image = newFile._id;
      }

      const newPost = await this.postModel.create(newPostData);

      const populatedPost = await newPost.populate([
        {
          path: 'createdBy',
          model: 'User',
          populate: {
            path: 'profile',
            model: 'Profile',
          },
        },
        {
          path: 'image',
          model: 'File',
        },
      ]);

      return populatedPost;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  getAll() {
    return this.postModel
      .find()
      .populate({
        path: 'createdBy',
        model: 'User',
        populate: {
          path: 'profile',
          model: 'Profile',
        },
      })
      .populate({
        path: 'image',
        model: 'File',
      });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/medias.service';
import { ApprovePostDto } from './dto/approve-post.dto';
import { FilterDto } from './dto/filter.dto';
import { DeletePostDto } from './dto/delete-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    public readonly postModel: Model<Post>,
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
          populate: {
            path: 'profile',
            populate: ['avatar', 'coverPhoto'],
          },
        },
        { path: 'image' },
      ]);
      return populatedPost;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  getAll(filterQuery?: FilterDto) {
    const filter: FilterQuery<Post> =
      filterQuery && Object.keys(filterQuery).length > 0 ? filterQuery : {};

    if (filterQuery.content) {
      filter.content = { $regex: filterQuery.content, $options: 'i' };
    }

    return this.postModel.find(filter).populate(this.getPopulateOptions());
  }

  private getPopulateOptions() {
    return [
      {
        path: 'createdBy',
        populate: {
          path: 'profile',
          populate: ['avatar', 'coverPhoto'],
        },
      },
      { path: 'image' },
      {
        path: 'sharedPost',
        populate: [
          {
            path: 'createdBy',
            populate: {
              path: 'profile',
              populate: ['avatar', 'coverPhoto'],
            },
          },
          { path: 'image' },
        ],
      },
    ];
  }

  getOne(id: string) {
    return this.postModel.findById(new Types.ObjectId(id)).populate([
      {
        path: 'createdBy',
        populate: {
          path: 'profile',
          populate: ['avatar', 'coverPhoto'],
        },
      },
      { path: 'image' },
      {
        path: 'sharedPost',
        populate: [
          {
            path: 'createdBy',
            populate: {
              path: 'profile',
              populate: ['avatar', 'coverPhoto'],
            },
          },
          { path: 'image' },
        ],
      },
    ]);
  }

  getByUserId(userId: string) {
    return this.postModel
      .find({ createdBy: new Types.ObjectId(userId) })
      .populate([
        {
          path: 'createdBy',
          populate: {
            path: 'profile',
            populate: ['avatar', 'coverPhoto'],
          },
        },
        { path: 'image' },
        {
          path: 'sharedPost',
          populate: [
            {
              path: 'createdBy',
              populate: {
                path: 'profile',
                populate: ['avatar', 'coverPhoto'],
              },
            },
            { path: 'image' },
          ],
        },
      ]);
  }

  async setApprove(id: string, flagDto: ApprovePostDto) {
    try {
      await this.postModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          isApproved: flagDto.flag === 1 ? true : false,
          status: flagDto.flag === 1 ? 'approved' : 'disApproved',
        },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to approve status',
      );
    }
  }

  async setDelete(id: string, flagDto: DeletePostDto) {
    try {
      await this.postModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          isDeleted: flagDto.flag === 1 ? true : false,
        },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to soft delete status',
      );
    }
  }

  async permanentlyDelete(id: string) {
    try {
      await this.postModel.findByIdAndDelete(new Types.ObjectId(id));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './entities/profile.entity';
import { Model, Types } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/medias.service';
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
    private readonly mediaService: MediaService,
  ) {}

  async updateOne(userId: string, profileDto: Partial<CreateProfileDto>) {
    try {
      const updatedProfile = await this.profileModel.findOneAndUpdate(
        { user: new Types.ObjectId(userId) },
        { $set: profileDto },

        { new: true },
      );
      updatedProfile.save();

      if (!updatedProfile) throw new BadRequestException('Profile not found');

      return updatedProfile;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadAvatar(avatar: IUploadedMulterFile, user: UserPayload) {
    try {
      if (!avatar) return new BadRequestException('Avatar null');

      const newAvatarFile = await this.mediaService.createFile(
        avatar,
        user,
        'avatars',
      );

      if (newAvatarFile instanceof BadRequestException) throw newAvatarFile;

      const existingProfile = await this.profileModel.findOne({
        user: new Types.ObjectId(user._id),
      });

      newAvatarFile.createdBy = user._id;

      await newAvatarFile.save();

      existingProfile.avatar = newAvatarFile._id;

      await existingProfile.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadCoverPhoto(coverPhoto: IUploadedMulterFile, user: UserPayload) {
    try {
      if (!coverPhoto) return new BadRequestException('Avatar null');

      const newCoverPhoto = await this.mediaService.createFile(
        coverPhoto,
        user,
        'cover-photos',
      );

      if (newCoverPhoto instanceof BadRequestException) throw newCoverPhoto;

      const existingProfile = await this.profileModel.findOne({
        user: new Types.ObjectId(user._id),
      });

      newCoverPhoto.createdBy = user._id;

      await newCoverPhoto.save();

      existingProfile.coverPhoto = newCoverPhoto._id;

      await existingProfile.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

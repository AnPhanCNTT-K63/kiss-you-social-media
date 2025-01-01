import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './entities/profile.entity';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { COLLECTION_NAMES } from 'src/constants';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
  ) {}

  async updateOne(id: string, profileDto: Partial<CreateProfileDto>) {
    const updatedProfile = await this.profileModel.findByIdAndUpdate(
      id,
      { $set: profileDto },
      { new: true },
    );

    if (!updatedProfile) throw new BadRequestException('Profile not found');

    return updatedProfile;
  }
}

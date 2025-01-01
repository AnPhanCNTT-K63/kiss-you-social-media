import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../profile/entities/profile.entity';
import { UserPayload } from 'src/common/models/user-payload.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
  ) {}

  getAll() {
    return this.userModel.find().populate('profile', null, 'Profile');
  }

  getOne(filter: FilterQuery<User>) {
    try {
      return this.userModel.findOne(filter);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async creatOne(userDto: CreateUserDto) {
    try {
      var newUser = await this.userModel.create(userDto);
      var profile = new Profile();
      profile.user = newUser._id;
      const newProfile = await this.profileModel.create(profile);
      newUser.profile = newProfile._id;
      newProfile.save();
      newUser.save();
      return {
        message: 'Create success',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addFriend(friendId: string, user: UserPayload) {
    try {
      await this.userModel.findByIdAndUpdate(
        user._id,
        {
          $push: { friends: friendId },
        },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

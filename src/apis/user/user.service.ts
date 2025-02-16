import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../profile/entities/profile.entity';
import { UserPayload } from 'src/common/models/user-payload.model';
import { AddFriendDto } from './dto/add-friend.dto';
import { NotificationService } from '../notification/notification.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FilterDto } from './dto/filter.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
import { SoftDeleteDto } from './dto/delete-soft.dto';

@Injectable()
export class UserService {
  private readonly OFFLINE_THRESHOLD = 60 * 1000;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
    private readonly notificationService: NotificationService,
  ) {}

  getAll(filterQuery?: FilterDto) {
    const filter: FilterQuery<User> = this.buildFilter(filterQuery);

    return this.userModel.find(filter).populate(this.getPopulateOptions());
  }

  private buildFilter(filterQuery?: FilterDto): FilterQuery<User> {
    if (!filterQuery || Object.keys(filterQuery).length === 0) {
      return {};
    }

    const filter: FilterQuery<User> = {};

    if (filterQuery.isOnline !== undefined) {
      filter.isOnline = filterQuery.isOnline;
    }

    if (filterQuery.username) {
      filter.username = { $regex: filterQuery.username, $options: 'i' };
    }

    return filter;
  }

  private getPopulateOptions() {
    return {
      path: 'profile',
      populate: ['avatar', 'coverPhoto'],
    };
  }

  getOne(filter: FilterQuery<User>) {
    try {
      return this.userModel.findOne(filter).populate({
        path: 'profile',
        populate: ['avatar', 'coverPhoto'],
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  getMany(filter: FilterQuery<User>) {
    try {
      return this.userModel.findOne(filter).populate({
        path: 'profile',
        populate: ['avatar', 'coverPhoto'],
      });
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

  async getFriend(id: string) {
    try {
      const user = await this.userModel.findById(new Types.ObjectId(id));

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const friends = await this.userModel
        .find({ _id: { $in: user.friends } })
        .populate({
          path: 'profile',
          populate: ['avatar', 'coverPhoto'],
        });

      return friends;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to fetch friends');
    }
  }

  async getNotFriend(id: string, filterQuery?: FilterDto) {
    try {
      const filter: FilterQuery<User> = this.buildFilter(filterQuery);
      const user = await this.userModel.findById(new Types.ObjectId(id));

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const friends = await this.userModel
        .find({ _id: { $nin: user.friends } })
        .find(filter)
        .populate({
          path: 'profile',
          populate: ['avatar', 'coverPhoto'],
        });

      return friends;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to fetch friends');
    }
  }

  async addFriend(friend: AddFriendDto, user: UserPayload) {
    try {
      await this.userModel.findByIdAndUpdate(
        user._id,
        {
          $push: { friends: new Types.ObjectId(friend.friendId) },
        },
        { new: true },
      );

      await this.notificationService.create(friend.notification, user._id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateAccount(id: string, updateDto: Partial<UpdateAccountDto>) {
    try {
      const updateFields: Partial<UpdateAccountDto> = {};

      for (const key in updateDto) {
        if (updateDto[key] !== '') {
          updateFields[key] = updateDto[key];
        }
      }

      if (updateFields.password) {
        updateFields.password = await bcrypt.hash(updateFields.password, 10);
      }

      const existingUser = await this.userModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        { $set: updateFields },
        { new: true },
      );

      return existingUser;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update account',
      );
    }
  }

  async updateBan(id: string, flagDto: UpdateBanDto) {
    try {
      await this.userModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          isBanned: flagDto.flag === 1 ? true : false,
        },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update ban status',
      );
    }
  }

  async getRegisterStatistics(year: number) {
    try {
      const registerUsersPerMonth = await this.userModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: '$createdAt' },
            registerCount: { $sum: 1 },
          },
        },
        {
          $project: {
            registerMonth: '$_id',
            registerCount: 1,
            _id: 0,
          },
        },
        { $sort: { registerMonth: 1 } },
      ]);

      return { registerUsersPerMonth };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to get register statistics',
      );
    }
  }

  async setSoftDelete(id: string, flagDto: SoftDeleteDto) {
    try {
      await this.userModel.findByIdAndUpdate(
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

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkOfflineUsers() {
    try {
      const thresholdTime = new Date(Date.now() - this.OFFLINE_THRESHOLD);
      await this.userModel.updateMany(
        { lastOnline: { $lt: thresholdTime }, isOnline: true },
        { isOnline: false },
      );
    } catch (error) {
      console.error('Failed to update offline users:', error);
    }
  }

  async heartBeat(id: string) {
    try {
      await this.userModel.findByIdAndUpdate(new Types.ObjectId(id), {
        isOnline: true,
        lastOnline: new Date(),
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update heartbeat',
      );
    }
  }
}

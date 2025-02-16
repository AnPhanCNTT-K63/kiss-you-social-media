import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './entities/notification.entity';
import { Model, Types } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    public readonly notificationModel: Model<Notification>,
  ) {}

  async create(
    notificationDto: CreateNotificationDto,
    senderId: Types.ObjectId,
  ) {
    try {
      await this.notificationModel.create({
        type: notificationDto.type,
        receiver: new Types.ObjectId(notificationDto.receiver),
        sender: senderId,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getALl(userId: string) {
    try {
      return this.notificationModel
        .find({
          receiver: new Types.ObjectId(userId),
        })
        .populate({
          path: 'sender',
          populate: {
            path: 'profile',
            populate: {
              path: 'avatar',
            },
          },
        });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

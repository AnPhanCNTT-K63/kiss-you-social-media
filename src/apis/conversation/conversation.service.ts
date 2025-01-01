import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './entities/conversation';
import { Model } from 'mongoose';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
  ) {}

  getAll() {
    try {
      return this.conversationModel.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createOne(dto: CreateConversationDto) {
    try {
      var res = await this.conversationModel.create({
        members: [dto.senderId, dto.receiverId],
      });

      if (!res) throw new BadRequestException("Can't create");
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  getByUserId(id: string) {
    try {
      return this.conversationModel.find({
        members: { $in: [id] },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

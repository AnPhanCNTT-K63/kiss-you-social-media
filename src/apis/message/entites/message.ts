import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/apis/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import { Conversation } from '../../conversation/entities/conversation';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.MESSAGE,
})
export class Message {
  @SuperProp({
    type: String,
  })
  text: string;

  @SuperProp({
    type: Types.ObjectId,
    ref: COLLECTION_NAMES.USER,
    refClass: User,
    required: true,
  })
  sender: Types.ObjectId;

  @SuperProp({
    type: Types.ObjectId,
    ref: COLLECTION_NAMES.CONVERSATION,
    refClass: Conversation,
    required: true,
  })
  conversation: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.plugin(autopopulateSoftDelete);

import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.CONVERSATION,
})
export class Conversation {
  @SuperProp({
    type: Array,
  })
  members: Array<string>;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
ConversationSchema.plugin(autopopulateSoftDelete);

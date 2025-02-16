import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/apis/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.NOTIFICATION,
})
export class Notification extends AggregateRoot {
  @SuperProp({
    type: String,
  })
  type: string;

  @SuperProp({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
    refClass: User,
  })
  receiver: Types.ObjectId;

  @SuperProp({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
    refClass: User,
  })
  sender: Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.plugin(autopopulateSoftDelete);

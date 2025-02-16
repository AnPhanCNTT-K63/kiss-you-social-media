import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Post } from 'src/apis/post/entities/post.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.SHARE,
})
export class Share extends AggregateRoot {
  @SuperProp({
    type: Types.ObjectId,
    required: false,
    ref: 'Post',
    refClass: Post,
  })
  post: Types.ObjectId;

  @SuperProp({
    type: Types.ObjectId,
    required: false,
    ref: 'User',
    refClass: User,
  })
  user: Types.ObjectId;
}

export const ShareSchema = SchemaFactory.createForClass(Share);
ShareSchema.plugin(autopopulateSoftDelete);

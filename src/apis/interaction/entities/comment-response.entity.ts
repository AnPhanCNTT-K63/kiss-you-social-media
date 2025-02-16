import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/apis/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';
import { Comment } from './comment.entity';
import { Post } from 'src/apis/post/entities/post.entity';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.RESPONSE,
})
export class CommentResponse extends AggregateRoot {
  @SuperProp({
    type: String,
    required: false,
  })
  content: string;

  @SuperProp({
    type: Types.ObjectId,
    required: true,
    ref: 'Comment',
    refClass: Comment,
  })
  comment: Types.ObjectId;

  @SuperProp({
    type: Types.ObjectId,
    required: true,
    ref: 'Post',
    refClass: Post,
  })
  post: Types.ObjectId;

  @SuperProp({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
    refClass: User,
  })
  user: Types.ObjectId;
}
export const CommentResponseSchema =
  SchemaFactory.createForClass(CommentResponse);
CommentResponseSchema.plugin(autopopulateSoftDelete);

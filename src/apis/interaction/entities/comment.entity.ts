import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Post } from 'src/apis/post/entities/post.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';
import { CommentResponse } from './comment-response.entity';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.COMMENT,
})
export class Comment extends AggregateRoot {
  @SuperProp({
    type: String,
    required: false,
  })
  content: string;

  @SuperProp({
    type: Number,
    required: false,
    default: 0,
  })
  likes: number;

  @SuperProp({
    type: Types.ObjectId,
    required: false,
    ref: 'User',
    refClass: User,
  })
  user: Types.ObjectId;

  @SuperProp({
    type: [Types.ObjectId],
    required: false,
    ref: 'CommentResponse',
    refClass: CommentResponse,
  })
  responses: Types.ObjectId[];

  @SuperProp({
    type: Types.ObjectId,
    required: true,
    ref: 'Post',
    refClass: Post,
  })
  post: Types.ObjectId;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.plugin(autopopulateSoftDelete);

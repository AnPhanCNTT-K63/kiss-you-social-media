import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { File } from 'src/apis/media/entities/file.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.POST,
})
export class Post extends AggregateRoot {
  @SuperProp({
    type: String,
    required: true,
  })
  content: string;

  @SuperProp({
    type: Number,
    required: true,
    default: 0,
  })
  likes: number;

  @SuperProp({
    type: Number,
    required: true,
    default: 0,
  })
  comments: number;

  @SuperProp({
    type: Number,
    required: true,
    default: 0,
  })
  shares: number;

  @SuperProp({
    type: String,
    required: false,
    default: 'pending',
  })
  status: string;

  @SuperProp({
    type: Types.ObjectId,
    ref: COLLECTION_NAMES.FILE,
    refClass: File,
  })
  image: Types.ObjectId;

  @SuperProp({
    type: Types.ObjectId,
    required: false,
    ref: COLLECTION_NAMES.USER,
    refClass: User,
  })
  createdBy: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.plugin(autopopulateSoftDelete);

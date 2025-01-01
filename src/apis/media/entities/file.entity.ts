import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/apis/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.FILE,
})
export class File extends AggregateRoot {
  @SuperProp({
    type: String,
    ref: COLLECTION_NAMES.FILE,
  })
  filePath: string;

  @SuperProp({
    type: String,
  })
  name: string;

  @SuperProp({
    type: String,
  })
  filename: string;

  @SuperProp({ type: String })
  folder: string;

  @SuperProp({ type: String })
  note: string;

  @SuperProp({ type: String })
  mime: string;

  @SuperProp({ type: Number })
  size: number;

  @SuperProp({ type: String })
  alt: string;

  @SuperProp({
    type: Types.ObjectId,
    ref: COLLECTION_NAMES.USER,
    refClass: User,
  })
  createdBy: Types.ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.plugin(autopopulateSoftDelete);

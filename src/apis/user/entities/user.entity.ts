import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import { AggregateRoot } from 'src/entities/aggregate-root.schema';
import { Profile } from '../../profile/entities/profile.entity';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  collection: COLLECTION_NAMES.USER,
})
export class User extends AggregateRoot {
  @SuperProp({
    type: String,
    required: true,
  })
  username: string;

  @SuperProp({
    type: String,
    required: true,
  })
  email: string;

  @SuperProp({
    autoPopulateExclude: true,
    type: String,
    required: true,
  })
  password: string;

  @SuperProp({
    type: String,
    required: true,
    default: 'user',
  })
  role: string;

  @SuperProp({
    type: [Types.ObjectId],
    required: false,
    ref: COLLECTION_NAMES.USER,
    refClass: User,
  })
  friends: Types.ObjectId[];

  @SuperProp({
    type: Types.ObjectId,
    required: false,
    ref: COLLECTION_NAMES.PROFILE,
    refClass: Profile,
  })
  profile: Types.ObjectId;
}

export const UserShema = SchemaFactory.createForClass(User);
UserShema.plugin(autopopulateSoftDelete);

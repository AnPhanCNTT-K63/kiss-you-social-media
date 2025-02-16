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
    required: false,
  })
  password: string;

  @SuperProp({
    type: String,
    required: true,
    default: 'user',
  })
  role: string;

  @SuperProp({
    type: Boolean,
    default: false,
  })
  isOnline: boolean;

  @SuperProp({
    type: Boolean,
    default: false,
  })
  isBanned: boolean;

  @SuperProp({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;

  @SuperProp({
    type: Date,
    required: false,
  })
  lastOnline: Date;

  @SuperProp({
    type: [Types.ObjectId],
    required: false,
    ref: 'User',
    refClass: User,
  })
  friends: Types.ObjectId[];

  @SuperProp({
    type: Types.ObjectId,
    required: false,
    ref: 'Profile',
    refClass: Profile,
  })
  profile: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(autopopulateSoftDelete);

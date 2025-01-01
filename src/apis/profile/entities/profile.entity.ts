import { SuperProp } from '@libs/super-core/decorators/super-prop.decorator';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import { User } from '../../user/entities/user.entity';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  collection: COLLECTION_NAMES.PROFILE,
})
export class Profile {
  @SuperProp({
    type: String,
    required: false,
  })
  firstName: string;

  @SuperProp({
    type: String,
    required: false,
  })
  lastName: string;

  @SuperProp({
    type: String,
    required: false,
  })
  address: string;

  @SuperProp({
    type: String,
    required: false,
  })
  postalCode: string;

  @SuperProp({
    type: String,
    required: false,
  })
  aboutMe: string;

  @SuperProp({
    type: String,
    required: false,
  })
  Phone: string;

  @SuperProp({
    type: Date,
    required: false,
  })
  birthday: Date;

  @SuperProp({
    type: String,
    required: false,
  })
  image: string;

  @SuperProp({
    type: String,
    required: false,
  })
  country: string;

  @SuperProp({
    type: Types.ObjectId,
    required: true,
    ref: COLLECTION_NAMES.USER,
    refClass: User,
  })
  user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.plugin(autopopulateSoftDelete);

import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserShema } from './entities/user.entity';
import { Profile, ProfileSchema } from '../profile/entities/profile.entity';
import { ProfileModule } from '../profile/profile.module';
import { PostModule } from '../post/post.module';
import { COLLECTION_NAMES } from 'src/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserShema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    ProfileModule,
    PostModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

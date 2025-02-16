import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './profile.service';
import { COLLECTION_NAMES } from 'src/constants';
import { MediaService } from '../media/medias.service';
import { MediaModule } from '../media/medias.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    MediaModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { appSettings } from './configs/app-settings';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PostModule } from './apis/post/post.module';
import { S3Module } from './packages/s3/s3.module';
import { MediaModule } from './apis/media/medias.module';
import { ConversationModule } from './apis/conversation/conversation.module';
import { MessageModule } from './apis/message/message.module';
import { InteractionModule } from './apis/interaction/interaction.module';
import { NotificationModule } from './apis/notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb+srv://phanducan147:WUwbrr0kHuNMRnKL@cluster0.xdq0e.mongodb.net/',
      }),
    }),
    UserModule,
    AuthModule,
    PostModule,
    S3Module,
    MediaModule,
    ConversationModule,
    MessageModule,
    InteractionModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

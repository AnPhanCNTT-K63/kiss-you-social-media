import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNotificationDto } from 'src/apis/notification/dto/create-notification.dto';

export class CreateCommentDto {
  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  post: string;

  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @SuperApiProperty({
    type: CreateNotificationDto,
  })
  @IsNotEmpty()
  notification: CreateNotificationDto;
}

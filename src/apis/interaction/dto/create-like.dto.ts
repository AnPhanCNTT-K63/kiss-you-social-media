import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNotificationDto } from 'src/apis/notification/dto/create-notification.dto';

export class CreateLikeDto {
  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  post: string;

  @SuperApiProperty({
    type: CreateNotificationDto,
  })
  @IsNotEmpty()
  notification: CreateNotificationDto;
}

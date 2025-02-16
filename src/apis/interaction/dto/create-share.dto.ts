import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { CreateNotificationDto } from 'src/apis/notification/dto/create-notification.dto';

export class CreateShareDto {
  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  post: string;

  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  content: string;

  @SuperApiProperty({
    type: CreateNotificationDto,
  })
  @IsNotEmpty()
  notification: CreateNotificationDto;
}

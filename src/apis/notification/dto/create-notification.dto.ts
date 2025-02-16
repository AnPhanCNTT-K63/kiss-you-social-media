import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  receiver: string;

  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  type: string;
}

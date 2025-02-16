import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class UnlikeDto {
  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  post: string;
}

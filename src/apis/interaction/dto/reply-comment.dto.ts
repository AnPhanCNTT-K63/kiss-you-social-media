import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyCommentDto {
  @SuperApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

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
}

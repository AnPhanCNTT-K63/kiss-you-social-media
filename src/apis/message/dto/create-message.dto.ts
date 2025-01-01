import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDto {
  @SuperApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @SuperApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  sender: Types.ObjectId;

  @SuperApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  conversation: Types.ObjectId;
}

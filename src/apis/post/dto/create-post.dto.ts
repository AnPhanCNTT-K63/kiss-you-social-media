import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { convertStringToObjectId } from 'src/utils/helper';

export class CreatePostDto {
  @SuperApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}

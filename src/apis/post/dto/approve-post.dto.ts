import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApprovePostDto {
  @SuperApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  flag: number;
}

import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBanDto {
  @SuperApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  flag: number;
}

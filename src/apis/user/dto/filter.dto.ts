import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @SuperApiProperty({
    type: Boolean,
    required: false,
  })
  @IsOptional()
  isOnline: boolean;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  username: string;
}

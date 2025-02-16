import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @SuperApiProperty({
    type: Boolean,
    required: false,
  })
  @IsOptional()
  isApproved: boolean;

  @SuperApiProperty({
    type: Boolean,
    required: false,
  })
  @IsOptional()
  isDeleted: boolean;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  content: string;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  status: string;
}

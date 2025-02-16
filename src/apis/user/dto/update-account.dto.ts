import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @SuperApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  email: string;

  @SuperApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  password: string;

  @SuperApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  username: string;
}

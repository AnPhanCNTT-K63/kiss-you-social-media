import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CheckPasswordDto {
  @SuperApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  user: string;

  @SuperApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

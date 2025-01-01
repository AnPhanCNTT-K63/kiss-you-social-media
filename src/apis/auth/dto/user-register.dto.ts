import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @SuperApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @SuperApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @SuperApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

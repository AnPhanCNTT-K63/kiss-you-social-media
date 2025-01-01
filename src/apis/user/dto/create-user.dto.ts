import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @SuperApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @SuperApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @SuperApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

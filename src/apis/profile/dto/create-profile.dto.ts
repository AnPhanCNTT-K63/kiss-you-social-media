import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  address: string;

  @SuperApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  postalCode: string;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  aboutMe: string;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  Phone: string;

  @SuperApiProperty({
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  birthday: Date;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  image: string;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  country: string;
}

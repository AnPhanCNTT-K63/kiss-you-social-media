import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { Type } from 'class-transformer';
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
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
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
  phone: string;

  @SuperApiProperty({
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @SuperApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  country: string;
}

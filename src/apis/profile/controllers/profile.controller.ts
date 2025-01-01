import { BadRequestException, Controller, Param, Patch } from '@nestjs/common';
import { ProfileService } from '../profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
}

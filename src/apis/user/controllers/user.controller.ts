import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtAuthGuard } from '@libs/super-authorize/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateProfileDto } from 'src/apis/profile/dto/create-profile.dto';
import { ProfileService } from 'src/apis/profile/profile.service';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/common/models/user-payload.model';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  @Get('/who-am-i')
  whoAmI(@Me() user: UserPayload) {
    return this.userService.getOne({ _id: user._id });
  }

  @Get('/')
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne({ _id: id });
  }

  @Get('/friends/:id')
  async getFriends(@Param('id') id: string) {
    const me = await this.userService
      .getOne({ _id: id })
      .populate('friends', null, 'User');
    return me.friends;
  }

  @Patch('/add-friend/:friendId')
  addFriend(@Param('friendId') friendId: string, @Me() user: UserPayload) {
    return this.userService.addFriend(friendId, user);
  }

  @Patch('/update-profile/:id')
  updateProfile(@Param('id') id: string, profileDto: CreateProfileDto) {
    try {
      this.profileService.updateOne(id, profileDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

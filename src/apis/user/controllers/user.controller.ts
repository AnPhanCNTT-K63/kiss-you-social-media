import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtAuthGuard } from '@libs/super-authorize/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateProfileDto } from 'src/apis/profile/dto/create-profile.dto';
import { ProfileService } from 'src/apis/profile/profile.service';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/common/models/user-payload.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { appSettings } from 'src/configs/app-settings';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { AddFriendDto } from '../dto/add-friend.dto';
import { FilterDto } from '../dto/filter.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { UpdateBanDto } from '../dto/update-ban.dto';
import { SoftDeleteDto } from '../dto/delete-soft.dto';
import { Types } from 'mongoose';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  @Get('/')
  getAll(@Query() fiter?: FilterDto) {
    return this.userService.getAll(fiter);
  }

  @Get('/who-am-i')
  whoAmI(@Me() user: UserPayload) {
    return this.userService.getOne({ _id: user._id });
  }

  @Post('upload-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload endpoint',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * appSettings.maxFileSize.admin,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadAvatar(
    @Me() user: UserPayload,
    @UploadedFile() avatar: IUploadedMulterFile,
  ) {
    return this.profileService.uploadAvatar(avatar, user);
  }

  @Post('upload-cover-photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload endpoint',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * appSettings.maxFileSize.admin,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadCoverPhoto(
    @Me() user: UserPayload,
    @UploadedFile() coverPhoto?: IUploadedMulterFile,
  ) {
    this.profileService.uploadCoverPhoto(coverPhoto, user);
  }

  @Post('/add-friend')
  addFriend(@Body() friend: AddFriendDto, @Me() user: UserPayload) {
    return this.userService.addFriend(friend, user);
  }

  @Patch('/update-profile/:id')
  updateProfile(@Param('id') id: string, @Body() profileDto: CreateProfileDto) {
    try {
      this.profileService.updateOne(id, profileDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch('/update-account/:id')
  updateAccount(@Param('id') id: string, @Body() accountDto: UpdateAccountDto) {
    try {
      this.userService.updateAccount(id, accountDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch('/update-ban/:id')
  updateBan(@Param('id') id: string, @Body() flagDto: UpdateBanDto) {
    try {
      this.userService.updateBan(id, flagDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch('/soft-delete/:id')
  softDelete(@Param('id') id: string, @Body() flagDto: SoftDeleteDto) {
    try {
      this.userService.setSoftDelete(id, flagDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch('/ping/:id')
  updateStatus(@Param('id') id: string) {
    return this.userService.heartBeat(id);
  }

  @Get('/statistics/:year')
  async getRegisterStatistics(@Param('year') year: number) {
    return this.userService.getRegisterStatistics(year);
  }

  @Get('/friends/:id')
  async getFriends(@Param('id') id: string) {
    return this.userService.getFriend(id);
  }

  @Get('/not-friends/:id')
  async getNotFriends(@Param('id') id: string, @Query() fiter?: FilterDto) {
    return this.userService.getNotFriend(id, fiter);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne({ _id: new Types.ObjectId(id) });
  }
}

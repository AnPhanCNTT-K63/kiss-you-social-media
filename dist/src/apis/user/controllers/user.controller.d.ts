import { BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateProfileDto } from 'src/apis/profile/dto/create-profile.dto';
import { ProfileService } from 'src/apis/profile/profile.service';
import { UserPayload } from 'src/common/models/user-payload.model';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { AddFriendDto } from '../dto/add-friend.dto';
import { FilterDto } from '../dto/filter.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { UpdateBanDto } from '../dto/update-ban.dto';
import { SoftDeleteDto } from '../dto/delete-soft.dto';
import { Types } from 'mongoose';
export declare class UserController {
    private readonly userService;
    private readonly profileService;
    constructor(userService: UserService, profileService: ProfileService);
    getAll(fiter?: FilterDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../entities/user.entity").User, "find", {}>;
    whoAmI(user: UserPayload): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../entities/user.entity").User, "findOne", {}>;
    uploadAvatar(user: UserPayload, avatar: IUploadedMulterFile): Promise<BadRequestException>;
    uploadCoverPhoto(user: UserPayload, coverPhoto?: IUploadedMulterFile): void;
    addFriend(friend: AddFriendDto, user: UserPayload): Promise<void>;
    updateProfile(id: string, profileDto: CreateProfileDto): void;
    updateAccount(id: string, accountDto: UpdateAccountDto): void;
    updateBan(id: string, flagDto: UpdateBanDto): void;
    softDelete(id: string, flagDto: SoftDeleteDto): void;
    updateStatus(id: string): Promise<void>;
    getRegisterStatistics(year: number): Promise<{
        registerUsersPerMonth: any[];
    }>;
    getFriends(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getNotFriends(id: string, fiter?: FilterDto): Promise<(import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../entities/user.entity").User, "findOne", {}>;
}

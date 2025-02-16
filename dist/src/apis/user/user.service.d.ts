import { FilterQuery, Model, Types } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from '../profile/entities/profile.entity';
import { UserPayload } from 'src/common/models/user-payload.model';
import { AddFriendDto } from './dto/add-friend.dto';
import { NotificationService } from '../notification/notification.service';
import { FilterDto } from './dto/filter.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
import { SoftDeleteDto } from './dto/delete-soft.dto';
export declare class UserService {
    private readonly userModel;
    private readonly profileModel;
    private readonly notificationService;
    private readonly OFFLINE_THRESHOLD;
    constructor(userModel: Model<User>, profileModel: Model<Profile>, notificationService: NotificationService);
    getAll(filterQuery?: FilterDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "find", {}>;
    private buildFilter;
    private getPopulateOptions;
    getOne(filter: FilterQuery<User>): import("mongoose").Query<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "findOne", {}>;
    getMany(filter: FilterQuery<User>): import("mongoose").Query<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "findOne", {}>;
    creatOne(userDto: CreateUserDto): Promise<{
        message: string;
    }>;
    getFriend(id: string): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getNotFriend(id: string, filterQuery?: FilterDto): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    addFriend(friend: AddFriendDto, user: UserPayload): Promise<void>;
    updateAccount(id: string, updateDto: Partial<UpdateAccountDto>): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateBan(id: string, flagDto: UpdateBanDto): Promise<void>;
    getRegisterStatistics(year: number): Promise<{
        registerUsersPerMonth: any[];
    }>;
    setSoftDelete(id: string, flagDto: SoftDeleteDto): Promise<void>;
    checkOfflineUsers(): Promise<void>;
    heartBeat(id: string): Promise<void>;
}

import { Types } from 'mongoose';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/apis/user/user.service';
import { UserPayload } from 'src/common/models/user-payload.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: UserPayload): Promise<{
        _id: Types.ObjectId;
        role: string;
        email: string;
        username: string;
    }>;
}
export {};

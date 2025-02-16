import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { CheckPasswordDto } from './dto/check-password.dto';
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    register(userRegister: UserRegisterDto): Promise<void>;
    login(userLogin: UserLoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private getTokens;
    checkPassword(checkDto: CheckPasswordDto): Promise<void>;
}

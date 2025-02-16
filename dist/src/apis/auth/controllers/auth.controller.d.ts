import { AuthService } from '../auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { CheckPasswordDto } from '../dto/check-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userLogin: UserLoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(userRegister: UserRegisterDto): Promise<void>;
    checkPassword(checkDto: CheckPasswordDto): Promise<void>;
}

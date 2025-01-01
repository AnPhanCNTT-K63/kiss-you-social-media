import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../user/user.service';
import { appSettings } from 'src/configs/app-settings';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserPayload } from 'src/common/models/user-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async register(userRegister: UserRegisterDto) {
    try {
      const { username, email, password } = userRegister;

      var existingUser = await this.userService.getOne({ username });

      if (existingUser) throw new BadRequestException('User already existed');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.userService.creatOne({
        username,
        email,
        password: hashedPassword,
      });

      // const accessToken = await this.jwtService.signAsync(
      //   { userId: newUser.id, email: newUser.email },
      //   {
      //     expiresIn: appSettings.jwt.expireIn,
      //     secret: appSettings.jwt.secret,
      //   },
      // );

      return {
        message: 'User successfully registered',
        // accessToken,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(userLogin: UserLoginDto) {
    const { email, password } = userLogin;

    const user = await this.userService.getOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const userPayload: UserPayload = {
      _id: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
    };

    const token = await this.getTokens(userPayload);
    return token;
  }

  private async getTokens(user: UserPayload) {
    const { _id, role, email, username } = user;

    const payload = { _id, role, email, username };

    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: appSettings.jwt.refreshExpireIn,
        secret: appSettings.jwt.refreshSecret,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: appSettings.jwt.expireIn,
        secret: appSettings.jwt.secret,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}

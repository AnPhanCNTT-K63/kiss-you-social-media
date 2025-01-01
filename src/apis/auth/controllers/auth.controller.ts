import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  login(@Body() userLogin: UserLoginDto) {
    return this.authService.login(userLogin);
  }

  @Post('signup')
  register(@Body() userRegister: UserRegisterDto) {
    return this.authService.register(userRegister);
  }
}

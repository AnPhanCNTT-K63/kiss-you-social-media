import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { appSettings } from 'src/configs/app-settings';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@libs/super-authorize/strategies/jwt-strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: appSettings.jwt.secret,
      signOptions: {
        expiresIn: appSettings.jwt.expireIn,
        //issuer: appSettings.jwt.issuer,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './contants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth-user.entity';
import { OtpStore } from './entities/auth-otp.entity';
import { MailerLoginService } from './mailer/login-mailer.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtContants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([User, OtpStore]),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailerLoginService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

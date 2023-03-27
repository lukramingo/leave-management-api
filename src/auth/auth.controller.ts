import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth-user.entity';
import { OtpDto } from './dto/otp-auth.dto';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
    return this.authService.signin(loginAuthDto);
  }

  @Post('login/verify')
  verifyUser(
    @Body() otpDto: OtpDto,
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<any> {
    return this.authService.verifyUser(otpDto, loginAuthDto);
  }
}

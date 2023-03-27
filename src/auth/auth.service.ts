import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth-user.entity';
import * as crypto from 'crypto';
import { OtpStore } from './entities/auth-otp.entity';
import { MailerLoginService } from './mailer/login-mailer.service';
import { OtpDto } from './dto/otp-auth.dto';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(OtpStore)
    private optRepo: Repository<OtpStore>,
    private mailerLoginService: MailerLoginService,
    private jwtService: JwtService,
  ) {}

  async signin(loginAuthDto: LoginAuthDto): Promise<any> {
    const { username } = loginAuthDto;
    const findUser = await this.userRepo.findOne({
      where: { email: username },
    });
    if (!findUser) {
      throw new NotFoundException(`${username} not found!`);
    }

    const otpCode = crypto.randomInt(10000, 99999).toString();

    const otpStore = new OtpStore();
    otpStore.otp = otpCode;
    otpStore.userId = findUser.id;
    await this.optRepo.save(otpStore);

    await this.mailerLoginService.sendVerificationEmail(
      findUser.email,
      otpCode,
    );

    return { message: 'login verify otp has send to email' };
  }

  async verifyUser({ otp }: OtpDto, { username }: LoginAuthDto): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email: username } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const latestOtp = await this.optRepo
      .createQueryBuilder('OtpStore')
      .where({ userId: user.id })
      .orderBy('id', 'DESC')
      .getOne();

    if (!latestOtp || latestOtp.status === '1' || latestOtp.otp !== otp) {
      throw new BadRequestException('otp invalid');
    }

    // expired time check for otp
    let myEpochCurrent = Math.floor(new Date().getTime());
    let myExpiredOtp = moment(latestOtp.created_at).add(10, 'minutes').toDate();
    let myEpochExpiredOtp = Math.floor(myExpiredOtp.getTime());

    if (myEpochExpiredOtp < myEpochCurrent) {
      throw new BadRequestException('otp has expired');
    }
    await this.optRepo
      .createQueryBuilder()
      .update(OtpStore)
      .set({ status: '1' })
      .where({ id: latestOtp.id })
      .execute();

    const payload: JwtPayload = { username: user.email, id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return {
      status: true,
      message: 'token successfully generate!',
      data: { accessToken },
    };
  }

  findByUsername(username: string) {
    return this.userRepo.findOne({ where: { email: username } });
  }
}

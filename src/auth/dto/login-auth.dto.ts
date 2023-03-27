import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  username: string;
}

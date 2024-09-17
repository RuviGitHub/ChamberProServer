import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsEmail()
  phone_number: string;

  @IsString()
  password: string;
}

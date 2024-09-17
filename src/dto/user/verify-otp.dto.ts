import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean, IsEmail, Length } from 'class-validator';

export class VerifyOtpDTO {

  @IsNotEmpty()
  @IsString()
  @Length(1, 11)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  phone_number?: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  otp?: string;

}
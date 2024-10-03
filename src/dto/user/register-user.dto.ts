import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean, IsEmail, Length } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 11)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  phone_number?: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 2)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  country_code?: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 120)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  full_name?: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password?: string;

}
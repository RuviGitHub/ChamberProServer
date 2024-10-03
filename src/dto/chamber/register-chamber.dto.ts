import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean, IsEmail, Length, IsDate } from 'class-validator';

export class RegisterChamberDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 60)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  chamber_name: string;

  @IsNotEmpty()
  @IsInt()
  complex_id?: number;

  @IsNotEmpty()
  @IsInt()
  package_id?: number;

  @IsNotEmpty()
  @IsInt()
  user_id?: number;

}
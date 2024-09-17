import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean, IsEmail, Length, IsDate } from 'class-validator';

export class RegisterChamberDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 60)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  chamber_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 120)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  complex_name?: string;

  @IsNotEmpty()
  @IsInt()
  package_id?: number;

}
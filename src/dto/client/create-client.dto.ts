import { IsString, IsInt, IsEmail, IsOptional, IsDateString, IsBoolean, Length } from 'class-validator';

export class CreateClientDTO {
  @IsString()
  @Length(12, 12)
  client_nic: string;

  @IsString()
  @Length(1, 60)
  client_name: string;

  @IsString()
  @Length(1, 12)
  client_name_initial: string;

  @IsString()
  @Length(1, 60)
  client_surname: string;

  @IsString()
  client_address_line_1: string;

  @IsOptional()
  @IsString()
  client_address_line_2?: string;

  @IsString()
  client_city: string;

  @IsInt()
  client_postal_code: number;

  @IsInt()
  client_district_id: number;

  @IsString()
  @Length(10, 15)
  client_land_number: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  client_phone_number?: string;

  @IsString()
  @Length(2, 3)
  client_country_code: string;

  @IsOptional()
  @IsEmail()
  @Length(5, 100)
  client_email?: string;

  @IsDateString()
  client_dob: string;

  @IsInt()
  client_gender: number;

  @IsString()
  client_nationality_id: string;

  @IsOptional()
  @IsString()
  client_occupation?: string;

  @IsOptional()
  @IsString()
  client_description?: string;

  @IsInt()
  chamber_id: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;
}

import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDateString,
  Length,
} from 'class-validator';

export class CreateAppointmentDTO {
  @IsInt()
  client_id: number;

  @IsString()
  @IsNotEmpty()
  @Length(12, 12)
  client_nic: string;

  @IsString()
  @IsNotEmpty()
  @Length(60, 60)
  client_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(13, 13)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  country_code: string;

  @IsDateString()
  @IsNotEmpty()
  time: Date;

  @IsString()
  @IsNotEmpty()
  @Length(60, 60)
  title: string;

  @IsInt()
  case_id: number;

  @IsString()
  @Length(60, 60)
  case_no: string;

  @IsInt()
  assign_lawyer_id: number;

  @IsString()
  doc_url: string;

  @IsBoolean()
  is_reminder_on: boolean;

  @IsString()
  note: string;

  @IsDateString()
  date: Date;
}

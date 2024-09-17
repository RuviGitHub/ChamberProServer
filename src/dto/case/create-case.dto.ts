import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCaseDTO {
  @IsString()
  case_title: string;

  @IsString()
  case_description: string;

  @IsInt()
  case_type: number; // Case type: 1 for criminal, 2 for civil, 3 for special, 4 for administrative

  @IsInt()
  client_id: number;

  @IsInt()
  police_id: number;

  @IsString()
  client_name: string;

  @IsString()
  client_nic: string;

  @IsString()
  case_no: string;

  @IsString()
  case_file_no: string;

  @IsInt()
  court_category: number; // Court category: 1 for primary, 2 for high court, 3 for district, 4 for magistrate, 5 for appeal

  @IsString()
  court_no: string;

  @IsString()
  case_proxy_lawyer: string;

  @IsString()
  case_assign_lawyer: string;

  @IsString()
  case_counselor_lawyer: string;

  @Type(() => Date)
  @IsDate()
  case_next_hearing_date: Date;

  @Type(() => Date)
  @IsDate()
  case_previous_hearing_date: Date;

  @IsOptional()
  @IsString()
  case_description_for_next_hearing?: string;

  @IsOptional()
  @IsString()
  case_document_urls?: string;

  @IsBoolean()
  is_reminder_on: boolean;

}

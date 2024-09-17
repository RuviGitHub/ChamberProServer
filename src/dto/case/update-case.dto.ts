import {
  IsInt,
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCaseDTO {
  @IsInt()
  @IsNotEmpty()
  case_id: number;

  @IsOptional()
  @IsString()
  case_title?: string;

  @IsOptional()
  @IsString()
  case_description?: string;

  @IsOptional()
  @IsInt()
  case_type?: number; // Case type: 1 for criminal, 2 for civil, 3 for special, 4 for administrative

  @IsOptional()
  @IsInt()
  client_id?: number;

  @IsOptional()
  @IsInt()
  police_id?: number;

  @IsOptional()
  @IsString()
  client_name?: string;

  @IsOptional()
  @IsString()
  client_nic?: string;

  @IsOptional()
  @IsString()
  case_no?: string;

  @IsOptional()
  @IsString()
  case_file_no?: string;

  @IsOptional()
  @IsInt()
  court_category?: number; // Court category: 1 for primary, 2 for high court, 3 for district, 4 for magistrate, 5 for appeal

  @IsOptional()
  @IsString()
  court_no?: string;

  @IsOptional()
  @IsString()
  case_proxy_lawyer?: string;

  @IsOptional()
  @IsString()
  case_assign_lawyer?: string;

  @IsOptional()
  @IsString()
  case_counselor_lawyer?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  case_next_hearing_date?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  case_previous_hearing_date?: Date;

  @IsOptional()
  @IsString()
  case_description_for_next_hearing?: string;

  @IsOptional()
  @IsString()
  case_document_urls?: string;

  @IsOptional()
  @IsBoolean()
  is_reminder_on?: boolean;
}

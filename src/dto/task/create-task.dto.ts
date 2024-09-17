import {
    IsString,
    IsInt,
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    MaxLength,
  } from 'class-validator';
  
  export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    task_name: string;
  
    @IsInt()
    task_priority: number;
  
    @IsInt()
    task_assigner_id: number;
  
    @IsString()
    @IsNotEmpty()
    case_no: string;
  
    @IsInt()
    case_id: number;
  
    @IsString()
    @IsNotEmpty()
    task_description: string;
  
    @IsBoolean()
    is_share_client_details_with_assigner: boolean;
  
    @IsBoolean()
    is_share_case_details_with_assigner: boolean;
  
    @IsDateString()
    task_due_date: Date;
  
    @IsString()
    @MaxLength(120)
    @IsNotEmpty()
    task_task_title: string;
  
    @IsString()
    @IsNotEmpty()
    task_task_description: string;
  
    @IsBoolean()
    is_reminder_on: boolean;
  
    @IsInt()
    status: number;
  
    @IsInt()
    chamber_id: number;
  
    @IsBoolean()
    is_active: boolean;
  }
  
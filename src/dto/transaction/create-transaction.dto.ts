import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  transaction_amount: number;

  @IsInt()
  @IsNotEmpty()
  payment_method: number; // 1: cash, 2: card, 3: cheque, 4: other

  @IsInt()
  @IsNotEmpty()
  transaction_type: number; // 1: income, 2: expense

  @IsInt()
  @IsNotEmpty()
  transaction_category: number; // 1: case, 2: task, 3: appointment

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsInt()
  @IsNotEmpty()
  status: number; // 1: active, 2: de-active

  @IsInt()
  @IsNotEmpty()
  chamber_id: number;

  @IsOptional()
  @IsInt()
  case_id?: number;

  @IsOptional()
  @IsInt()
  task_id?: number;

  @IsOptional()
  @IsInt()
  appointment_id?: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

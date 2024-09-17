import { IsInt, IsOptional, IsPositive, Min, IsString, IsIn, IsDateString } from 'class-validator';

export class PaginationAppointmentQueryDTO {
  @IsOptional()
  @IsPositive()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsPositive()
  @Min(1)
  perPage?: number;

  @IsOptional()
  @IsInt()
  @IsIn([1, -1])
  order?: number; // 1 for ascending, -1 for descending

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  status?: number;

  @IsOptional()
  @IsInt()
  client_id?: number;

  @IsOptional()
  @IsInt()
  case_id?: number;

  @IsOptional()
  @IsDateString()
  date?: Date;
}

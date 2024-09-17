import { IsInt, IsOptional, IsPositive, Min, IsString, IsIn, IsDateString } from 'class-validator';

export class PaginationTaskQueryDTO {
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
  priority?: number;

  @IsOptional()
  @IsInt()
  assigner_id?: number;

  @IsOptional()
  @IsDateString()
  task_due_date?: Date;
}

import { IsInt, IsOptional, IsPositive, Min, IsString, IsIn } from 'class-validator';

export class PaginationQueryDTO {
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
  @IsString()
  district?: string;
}

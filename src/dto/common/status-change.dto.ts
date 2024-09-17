import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsInt, IsString } from 'class-validator';

export class StatusChangeDTO {

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  id: number;

  @IsInt()
  @IsIn([1,2])
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  status: number;
}

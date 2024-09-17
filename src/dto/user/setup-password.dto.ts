import {
  IsNotEmpty,
  IsString,
  IsInt,
  Length,
} from 'class-validator';

export class SetupPasswordDTO {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password?: string;
}
